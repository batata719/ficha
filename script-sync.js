window.__multiplayerReady = (async () => {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
    const {
      getAuth,
      GoogleAuthProvider,
      signInWithPopup,
      signOut,
      onAuthStateChanged
    } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
    const {
      getFirestore,
      doc,
      setDoc,
      getDoc,
      onSnapshot,
      collection,
      deleteDoc,
      serverTimestamp,
      runTransaction
    } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
    const FIREBASE_CONFIG = {
      apiKey: "AIzaSyDKc688y119WyFzE5yGmxkaeYQBtLlI3FM",
      authDomain: "ordo-realitas-mesa.firebaseapp.com",
      projectId: "ordo-realitas-mesa",
      storageBucket: "ordo-realitas-mesa.firebasestorage.app",
      messagingSenderId: "1049343664232",
      appId: "1:1049343664232:web:00818b1ce7f88101931bdd"
    };

    let db = null;
    let auth = null;
    let currentUser = null;
    let firebaseReady = false;
    let localDemoMode = false;
    let firebaseStatusText = "Aguardando Login com Google";

    const SESSION_META_KEY = "op_multiplayer_session_v1";
    let sessionState = loadSessionMeta();
    let unsubscribeRoomAgents = null;
    let unsubscribeRoomRolls = null;
    let roomAgentsCache = [];
    let roomRollsCache = [];
    let inspectedAgentId = null;
    let suppressRoomSync = false;

    function loadSessionMeta() {
      try {
        const raw = localStorage.getItem(SESSION_META_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return { roomCode: null, role: null, gmSecret: null, playerAlias: "" };
    }

    function saveSessionMeta() {
      localStorage.setItem(SESSION_META_KEY, JSON.stringify(sessionState));
    }

    function withTimeout(promise, ms, timeoutMsg) {
      return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(timeoutMsg)), ms))
      ]);
    }

    async function initFirebaseSync() {
      try {
        const app = initializeApp(FIREBASE_CONFIG);
        auth = getAuth(app);
        db = getFirestore(app);

        onAuthStateChanged(auth, async (user) => {
          if (user) {
            currentUser = user;
            firebaseReady = true;
            localDemoMode = false;
            firebaseStatusText = `Conectado: ${user.displayName || user.email || "Agente"}`;
            updateConnectionBadge();
            renderSessionModalBody();

            if (sessionState.roomCode && sessionState.role) {
              if (sessionState.role === "gm") {
                try {
                  const roomSnap = await getDoc(doc(db, "sessions", sessionState.roomCode));
                  if (!roomSnap.exists() || roomSnap.data().gmUid !== user.uid) {
                    leaveSession();
                    alertModalInfo("Apenas a conta Google que criou esta sala pode entrar como Mestre.");
                    return;
                  }
                } catch (err) {
                  console.error("[Ordo Sync] Não foi possível validar o Mestre da sala:", err);
                  leaveSession();
                  alertModalInfo(`Não foi possível validar o acesso de Mestre: ${err.message || err}`);
                  return;
                }
              }
              connectToRoomListeners(sessionState.roomCode);
              if (sessionState.role === "player") {
                pushActiveAgentToRoom();
              }
            }
          } else {
            currentUser = null;
            firebaseReady = false;
            firebaseStatusText = "Desconectado — Entre com Google";
            renderSessionModalBody();
          }
        });
        return true;
      } catch (err) {
        console.error("[Ordo Sync] Falha ao iniciar Firebase:", err);
        firebaseStatusText = `Erro Firebase: ${err.code || err.message}`;
        renderSessionModalBody();
        return false;
      }
    }

    async function loginWithGoogle() {
      try {
        if (!auth) await initFirebaseSync();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        currentUser = result.user;
        firebaseReady = true;
        localDemoMode = false;
        firebaseStatusText = `Conectado: ${currentUser.displayName || currentUser.email}`;
        renderSessionModalBody();
        return true;
      } catch (err) {
        alertModalInfo(`Erro no Login Google (${err.code || "Auth"}): ${err.message}`);
        return false;
      }
    }

    async function logoutFirebaseUser() {
      if (!auth) return;
      leaveSession();
      await signOut(auth);
      currentUser = null;
      firebaseReady = false;
      firebaseStatusText = "Desconectado — Entre com Google";
      renderSessionModalBody();
    }

    // Intercepta o salvamento da ficha para enviar atualizações em tempo real
    const originalSetItem = localStorage.setItem.bind(localStorage);
    let syncDebounceTimer = null;

    localStorage.setItem = function (key, value) {
      originalSetItem(key, value);
      if (!suppressRoomSync && key === "op_agents_roster_v1" && sessionState.roomCode && sessionState.role === "player") {
        clearTimeout(syncDebounceTimer);
        syncDebounceTimer = setTimeout(() => {
          pushActiveAgentToRoom();
        }, 350);
      }
    };

    function setupRollObserver() {
      const toastContainer = document.getElementById("toast-container");
      if (!toastContainer) return;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && sessionState.roomCode) {
              const title = node.querySelector("span.text-xs.font-semibold")?.textContent?.trim() || "Rolagem";
              const detail = node.querySelector("p.text-xs.font-mono")?.textContent?.trim() || "";
              const resultEl = node.querySelector("div.text-2xl.font-mono");
              const result = resultEl?.textContent?.trim() || "";
              const isCrit = node.classList.contains("border-amber-400");
              const isFumble = node.classList.contains("border-rose-500");

              if (result) {
                broadcastRollToRoom({ title, detail, result, isCrit, isFumble });
              }
            }
          });
        });
      });

      observer.observe(toastContainer, { childList: true });
    }

    function getCurrentLocalAgent() {
      try {
        const raw = localStorage.getItem("op_agents_roster_v1");
        if (!raw) return null;
        const roster = JSON.parse(raw);
        return roster.agents.find((a) => a.id === roster.activeId) || roster.agents[0] || null;
      } catch (e) {
        return null;
      }
    }

    async function pushActiveAgentToRoom() {
      if (!sessionState.roomCode || sessionState.role !== "player" || !firebaseReady || !currentUser) return;
      const activeAgent = getCurrentLocalAgent();
      if (!activeAgent) return;

      const payload = {
        ...activeAgent,
        gmRevision: Number(activeAgent.gmRevision) || 0,
        ownerUid: currentUser.uid,
        playerAlias: sessionState.playerAlias || activeAgent.player || currentUser.displayName || "Jogador",
        syncedAt: Date.now()
      };

      try {
        const agentDocRef = doc(db, "sessions", sessionState.roomCode, "agents", activeAgent.id);
        const result = await runTransaction(db, async (transaction) => {
          const agentSnap = await transaction.get(agentDocRef);
          const remoteAgent = agentSnap.exists() ? agentSnap.data() : null;
          if (remoteAgent?.ownerUid && remoteAgent.ownerUid !== currentUser.uid) {
            throw new Error("Esta ficha já pertence a outro jogador nesta sala.");
          }
          const localRevision = Number(activeAgent.gmRevision) || 0;
          const remoteRevision = Number(remoteAgent?.gmRevision) || 0;
          if (remoteAgent && remoteRevision > localRevision) {
            return { newerRemoteAgent: remoteAgent };
          }
          transaction.set(agentDocRef, payload);
          return { newerRemoteAgent: null };
        });
        if (result.newerRemoteAgent) applyRemoteAgentToPlayer(result.newerRemoteAgent);
      } catch (err) {
        console.error("[Ordo Sync] Erro ao enviar ficha:", err);
        alertModalInfo(`Não foi possível sincronizar a ficha: ${err.message || err}`);
      }
    }

    function applyRemoteAgentToPlayer(remoteAgent) {
      if (!remoteAgent?.id || remoteAgent.ownerUid !== currentUser?.uid) return;
      try {
        const roster = JSON.parse(localStorage.getItem("op_agents_roster_v1") || "{}");
        if (!Array.isArray(roster.agents)) return;
        const index = roster.agents.findIndex((agent) => agent.id === remoteAgent.id);
        if (index < 0 || (Number(remoteAgent.gmRevision) || 0) <= (Number(roster.agents[index].gmRevision) || 0)) return;

        roster.agents[index] = { ...remoteAgent };
        suppressRoomSync = true;
        localStorage.setItem("op_agents_roster_v1", JSON.stringify(roster));
        if (typeof applyRemoteAgentToRoster === "function") applyRemoteAgentToRoster(remoteAgent);
      } catch (err) {
        console.error("[Ordo Sync] Erro ao aplicar edição do Mestre:", err);
        alertModalInfo(`A ficha recebeu uma edição do Mestre, mas não foi possível aplicá-la localmente: ${err.message || err}`);
      } finally {
        suppressRoomSync = false;
      }
    }

    async function broadcastRollToRoom(rollPayload) {
      if (!sessionState.roomCode || !firebaseReady || !currentUser) return;
      const activeAgent = getCurrentLocalAgent();
      const rollId = `roll_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const entry = {
        ...rollPayload,
        agentName: activeAgent?.name || "Agente",
        playerAlias: sessionState.playerAlias || activeAgent?.player || currentUser.displayName || "Jogador",
        timestamp: Date.now()
      };

      try {
        const rollRef = doc(db, "sessions", sessionState.roomCode, "rolls", rollId);
        await setDoc(rollRef, entry);
      } catch (err) {
        console.error("[Ordo Sync] Erro ao transmitir rolagem:", err);
      }
    }

    function generateRoomCode() {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code = "";
      for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
      return code;
    }

    async function createSessionAsGM() {
      const btn = document.getElementById("btn-create-gm-room");
      if (btn && btn.disabled) return;
      if (btn) {
        btn.disabled = true;
        btn.textContent = "⏳ Criando sala...";
      }

      try {
        if (!firebaseReady) {
          const logged = await loginWithGoogle();
          if (!logged) return;
        }

        const campaignName = document.getElementById("sync-campaign-name")?.value.trim() || "Missão Ordo Realitas";
        const roomCode = generateRoomCode();
        const gmSecret = Math.random().toString(36).substring(2, 10);

        const roomRef = doc(db, "sessions", roomCode);
        await withTimeout(
          setDoc(roomRef, {
            roomCode,
            campaignName,
            gmUid: currentUser.uid,
            gmSecret,
            createdAt: serverTimestamp()
          }),
          7000,
          "Tempo esgotado ao gravar no Firestore. Verifique se o banco Firestore foi criado e se as Regras foram publicadas."
        );

        sessionState = { roomCode, role: "gm", gmSecret, playerAlias: "Mestre" };
        saveSessionMeta();
        updateConnectionBadge();
        connectToRoomListeners(roomCode);
        renderSessionModalBody();
      } catch (err) {
        alertModalInfo(`Não foi possível criar a sala: ${err.message || "Verifique as regras do Firestore."}`);
      } finally {
        const freshBtn = document.getElementById("btn-create-gm-room");
        if (freshBtn) {
          freshBtn.disabled = false;
          freshBtn.textContent = "Criar Sala como Mestre →";
        }
      }
    }

    async function joinSessionAsPlayer() {
      const btn = document.getElementById("btn-join-player-room");
      if (btn && btn.disabled) return;
      if (btn) {
        btn.disabled = true;
        btn.textContent = "⏳ Conectando...";
      }

      try {
        if (!firebaseReady) {
          const logged = await loginWithGoogle();
          if (!logged) return;
        }

        const codeInput = (document.getElementById("sync-join-code")?.value || "").trim().toUpperCase();
        const aliasInput = (document.getElementById("sync-player-alias")?.value || "").trim();

        if (codeInput.length < 4) {
          alertModalInfo("Digite um código de sala válido (ex: A7K9P2).");
          return;
        }

        const roomRef = doc(db, "sessions", codeInput);
        const snap = await withTimeout(getDoc(roomRef), 7000, "Tempo esgotado ao buscar a sala no Firestore.");
        if (!snap.exists()) {
          alertModalInfo(`Sala "${codeInput}" não encontrada. Verifique o código com o Mestre.`);
          return;
        }

        sessionState = {
          roomCode: codeInput,
          role: "player",
          gmSecret: null,
          playerAlias: aliasInput || currentUser.displayName || "Agente"
        };
        saveSessionMeta();
        updateConnectionBadge();
        connectToRoomListeners(codeInput);
        await pushActiveAgentToRoom();
        renderSessionModalBody();
      } catch (err) {
        alertModalInfo(`Erro ao entrar na sala: ${err.message || err}`);
      } finally {
        const freshBtn = document.getElementById("btn-join-player-room");
        if (freshBtn) {
          freshBtn.disabled = false;
          freshBtn.textContent = "Conectar Ficha Ativa →";
        }
      }
    }

    async function rejoinAsGM() {
      if (!firebaseReady) {
        const logged = await loginWithGoogle();
        if (!logged) return;
      }
      const codeInput = (document.getElementById("sync-join-code")?.value || "").trim().toUpperCase();
      if (!codeInput) {
        alertModalInfo("Digite o código da sala para entrar como Mestre.");
        return;
      }

      const roomRef = doc(db, "sessions", codeInput);
      const snap = await getDoc(roomRef);
      if (!snap.exists()) {
        alertModalInfo(`Sala "${codeInput}" não encontrada.`);
        return;
      }
      if (snap.data().gmUid !== currentUser.uid) {
        alertModalInfo("Apenas a conta Google que criou esta sala pode entrar como Mestre.");
        return;
      }

      sessionState = {
        roomCode: codeInput,
        role: "gm",
        gmSecret: snap.data().gmSecret || "",
        playerAlias: "Mestre"
      };
      saveSessionMeta();
      updateConnectionBadge();
      connectToRoomListeners(codeInput);
      renderSessionModalBody();
    }

    function leaveSession() {
      if (unsubscribeRoomAgents) unsubscribeRoomAgents();
      if (unsubscribeRoomRolls) unsubscribeRoomRolls();
      unsubscribeRoomAgents = null;
      unsubscribeRoomRolls = null;
      roomAgentsCache = [];
      roomRollsCache = [];
      inspectedAgentId = null;

      sessionState = { roomCode: null, role: null, gmSecret: null, playerAlias: "" };
      saveSessionMeta();
      updateConnectionBadge();
      renderSessionModalBody();
    }

    async function removeAgentFromSession(agentId) {
      if (!firebaseReady || !sessionState.roomCode) return;
      await deleteDoc(doc(db, "sessions", sessionState.roomCode, "agents", agentId));
      if (inspectedAgentId === agentId) inspectedAgentId = null;
    }

    function connectToRoomListeners(roomCode) {
      if (unsubscribeRoomAgents) unsubscribeRoomAgents();
      if (unsubscribeRoomRolls) unsubscribeRoomRolls();

      const agentsCol = collection(db, "sessions", roomCode, "agents");
      unsubscribeRoomAgents = onSnapshot(agentsCol, (snapshot) => {
        roomAgentsCache = [];
        snapshot.forEach((docSnap) => {
          const agent = docSnap.data();
          roomAgentsCache.push(agent);
          if (sessionState.role === "player" && agent.ownerUid === currentUser?.uid) {
            applyRemoteAgentToPlayer(agent);
          }
        });
        roomAgentsCache.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        renderSessionModalBody();
      });

      const rollsCol = collection(db, "sessions", roomCode, "rolls");
      unsubscribeRoomRolls = onSnapshot(rollsCol, (snapshot) => {
        roomRollsCache = [];
        snapshot.forEach((docSnap) => roomRollsCache.push(docSnap.data()));
        roomRollsCache.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        roomRollsCache = roomRollsCache.slice(0, 25);
        renderSessionModalBody();
      });
    }

    function computeGMAgentSummary(ag) {
      const nexSteps = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 99];
      const level = Math.max(1, nexSteps.indexOf(ag.nex || 5) + 1);
      const attrs = ag.attributes || { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 };

      let basePv = 20, perPv = 4, basePe = 2, perPe = 2, baseSan = 12, perSan = 3;
      if (ag.charClass === "Especialista") {
        basePv = 16; perPv = 3; basePe = 3; perPe = 3; baseSan = 16; perSan = 4;
      } else if (ag.charClass === "Ocultista") {
        basePv = 12; perPv = 2; basePe = 4; perPe = 4; baseSan = 20; perSan = 5;
      }

      let originPv = ag.origin === "Desgarrado" ? level : 0;
      let originSan = ag.origin === "Vítima" ? level : 0;
      let originPe = ag.origin === "Universitário" ? (1 + Math.floor(level / 2)) : 0;
      let originDef = ag.origin === "Policial" ? 2 : 0;

      let powerPv = 0, powerPe = 0, powerDef = 0;
      (ag.abilities || []).forEach((ab) => {
        if (ab.name === "Sangue de Ferro") powerPv += level * 2;
        if (ab.name === "Potencial Aprimorado") powerPe += level * (ab.affinity ? 2 : 1);
        if (ab.name === "Precognição" || ab.name === "Reflexos Defensivos") powerDef += 2;
      });

      const maxPv = Math.max(1, basePv + attrs.VIG + (level - 1) * (perPv + attrs.VIG) + originPv + powerPv + (ag.bonusPv || 0));
      const maxPe = Math.max(1, basePe + attrs.PRE + (level - 1) * (perPe + attrs.PRE) + originPe + powerPe + (ag.bonusPe || 0));
      let maxSan = Math.max(1, baseSan + (level - 1) * perSan + originSan + (ag.bonusSan || 0));
      if (ag.origin === "Cultista Arrependido") maxSan = Math.floor(maxSan / 2);

      let armorDef = 0;
      (ag.inventory || []).forEach((it) => {
        if (it.type === "Proteção" && it.equipped) {
          const modBonus = (it.mods || []).includes("reforcada") ? 2 : 0;
          armorDef += (parseInt(it.defense) || 0) + modBonus;
        }
      });

      const defense = 10 + attrs.AGI + armorDef + originDef + powerDef + (ag.defenseOther || 0);
      const peLimit = level + (ag.origin === "Universitário" ? 1 : 0);
      const ritualDt = 10 + peLimit + attrs.PRE;

      return { maxPv, maxPe, maxSan, defense, peLimit, ritualDt };
    }

    function injectMultiplayerUI() {
      const topBarRight = document.querySelector("body > div:first-child .max-w-7xl > div:last-child");
      if (!document.getElementById("btn-open-session-hub")) {
        const btn = document.createElement("button");
        btn.id = "btn-open-session-hub";
        btn.type = "button";
        btn.innerHTML = `<span>🌐</span> <span id="session-btn-label">Mesa / Sessão</span>`;

        if (topBarRight) {
          btn.className = "px-2.5 py-1 rounded-md accent-soft-bg hover:brightness-110 border accent-border accent-text font-semibold transition flex items-center gap-1.5";
          topBarRight.prepend(btn);
        } else {
          btn.className = "fixed bottom-5 left-5 z-40 px-3.5 py-2 rounded-xl accent-bg text-white text-xs font-semibold shadow-xl flex items-center gap-1.5";
          document.body.appendChild(btn);
        }
      }

      if (!document.getElementById("modal-multiplayer-session")) {
        const modal = document.createElement("div");
        modal.id = "modal-multiplayer-session";
        modal.className = "fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden items-center justify-center p-4";
        modal.innerHTML = `
          <div class="bg-surface border border-borderSubtle rounded-2xl max-w-6xl w-full p-6 flex flex-col max-h-[92vh] space-y-4 shadow-2xl">
            <div class="flex items-center justify-between border-b border-borderSubtle pb-3">
              <div class="flex items-center gap-3">
                <span class="text-xl">🌐</span>
                <div>
                  <h3 class="text-base font-bold text-white">Servidores & Escudo do Mestre (Tempo Real)</h3>
                  <p class="text-xs text-zinc-400">Sincronize fichas da equipe ao vivo durante a sessão de Ordem Paranormal</p>
                </div>
              </div>
              <button type="button" id="btn-close-session-modal" class="text-zinc-400 hover:text-white text-lg px-2">✕</button>
            </div>
            <div id="session-modal-alert" class="hidden bg-rose-950/50 border border-rose-700/60 text-rose-200 text-xs rounded-xl px-3.5 py-2.5"></div>
            <div id="session-modal-body" class="overflow-y-auto flex-1 pr-1 space-y-4"></div>
          </div>
        `;
        document.body.appendChild(modal);
      }

      updateConnectionBadge();
    }

    function alertModalInfo(msg) {
      const el = document.getElementById("session-modal-alert");
      if (!el) return;
      el.textContent = msg;
      el.classList.remove("hidden");
      setTimeout(() => el.classList.add("hidden"), 7000);
    }

    function updateConnectionBadge() {
      const label = document.getElementById("session-btn-label");
      if (!label) return;
      if (sessionState.roomCode) {
        const roleTag = sessionState.role === "gm" ? "Mestre" : "Agente";
        label.textContent = `Sala ${sessionState.roomCode} (${roleTag})`;
      } else {
        label.textContent = "Mesa / Sessão";
      }
    }

    function renderSessionModalBody() {
      const body = document.getElementById("session-modal-body");
      if (!body) return;

      if (!sessionState.roomCode) {
        const statusBadgeClass = firebaseReady
          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
          : "bg-zinc-800 text-zinc-300 border-zinc-700";

        body.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2 bg-void border border-borderSubtle rounded-xl px-3.5 py-2.5 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-zinc-400">Conta:</span>
              <span class="font-mono px-2.5 py-0.5 rounded border ${statusBadgeClass}">${firebaseStatusText}</span>
            </div>
            <div class="flex items-center gap-2">
              ${firebaseReady
                ? `<button type="button" id="btn-google-logout" class="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition">Sair da Conta Google</button>`
                : `<button type="button" id="btn-google-login" class="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition flex items-center gap-1.5">
                    <span>🔵</span> <span>Entrar com Google</span>
                  </button>`
              }
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 py-1">
            <div class="bg-void border border-purple-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div class="space-y-2">
                <span class="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500/15 accent-text border border-purple-500/30">
                  Para o Mestre da Mesa
                </span>
                <h4 class="text-lg font-bold text-white">Criar Novo Servidor / Sessão</h4>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  Gera um código exclusivo de 6 letras. Todos os jogadores que entrarem terão suas fichas, PV, PE, Sanidade, Inventário e Rolagens exibidos ao vivo no seu Escudo do Mestre.
                </p>
                <div class="pt-2">
                  <label class="block text-xs text-zinc-400 mb-1">Nome da Campanha / Operação</label>
                  <input type="text" id="sync-campaign-name" placeholder="Ex: O Segredo na Floresta - Sessão 04"
                    class="w-full bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-xs text-white outline-none" />
                </div>
              </div>
              <button type="button" id="btn-create-gm-room" class="w-full py-2.5 rounded-xl accent-bg hover:bg-purple-500 text-white text-xs font-semibold transition">
                Criar Sala como Mestre →
              </button>
            </div>

            <div class="bg-void border border-borderSubtle rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div class="space-y-2">
                <span class="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Para Jogadores
                </span>
                <h4 class="text-lg font-bold text-white">Entrar em uma Sessão</h4>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  Digite o código fornecido pelo Mestre. Sua ficha ativa atual será sincronizada automaticamente sempre que você sofrer dano, gastar PE ou rolar dados.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div>
                    <label class="block text-xs text-zinc-400 mb-1">Código da Sala</label>
                    <input type="text" id="sync-join-code" maxlength="6" placeholder="Ex: X9K2P4"
                      class="w-full bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-xs font-mono uppercase text-white outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs text-zinc-400 mb-1">Seu Nome (Jogador)</label>
                    <input type="text" id="sync-player-alias" placeholder="Ex: Lucas"
                      class="w-full bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-xs text-white outline-none" />
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <button type="button" id="btn-join-player-room" class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition">
                  Conectar Ficha Ativa →
                </button>
                <button type="button" id="btn-rejoin-gm-room" title="Reabrir uma sala existente como Mestre" class="px-3 py-2.5 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 text-xs transition">
                  Entrar como Mestre
                </button>
              </div>
            </div>
          </div>
        `;
        return;
      }

      if (sessionState.role === "player") {
        const activeAg = getCurrentLocalAgent();
        body.innerHTML = `
          <div class="bg-void border border-emerald-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-sm font-bold text-white">Conectado à Sala <span class="font-mono text-emerald-300">${sessionState.roomCode}</span></span>
              </div>
              <p class="text-xs text-zinc-400">
                Transmitindo automaticamente: <strong class="text-white">${activeAg?.name || "Agente"}</strong> (NEX ${activeAg?.nex || 5}% • ${activeAg?.charClass || ""})
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" id="btn-force-sync-now" class="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 text-xs font-semibold transition">
                🔄 Sincronizar Agora
              </button>
              <button type="button" id="btn-leave-room" class="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 text-xs transition">
                Sair da Sala
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Agentes Conectados nesta Sessão (${roomAgentsCache.length})</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              ${roomAgentsCache.map(ag => `
                <div class="bg-void border border-borderSubtle rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-sm text-white">${ag.name || "Sem Nome"}</div>
                    <div class="text-[11px] text-zinc-400">${ag.charClass} • NEX ${ag.nex}% (${ag.playerAlias || "Jogador"})</div>
                  </div>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Online</span>
                </div>
              `).join("")}
            </div>
          </div>
        `;
        return;
      }

      const inspectedAgent = roomAgentsCache.find((a) => a.id === inspectedAgentId) || null;

      body.innerHTML = `
        <div class="bg-void border border-purple-500/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-4">
            <div>
              <span class="block text-[10px] font-mono uppercase text-zinc-400">Código para os Jogadores</span>
              <div class="flex items-center gap-2">
                <span class="text-2xl font-mono font-bold tracking-widest accent-text">${sessionState.roomCode}</span>
                <button type="button" id="btn-copy-room-code" class="px-2.5 py-1 rounded-lg bg-elevated hover:bg-zinc-800 border border-borderSubtle text-[11px] text-zinc-200 transition">
                  📋 Copiar Código
                </button>
              </div>
            </div>
            <div class="h-8 w-px bg-[#26262e] hidden sm:block"></div>
            <div class="text-xs text-zinc-400">
              <div>Agentes na Mesa: <strong class="text-white font-mono">${roomAgentsCache.length}</strong></div>
              <div>Status: <span class="text-emerald-400">● Escudo do Mestre Ativo</span></div>
            </div>
          </div>

          <button type="button" id="btn-leave-gm-room" class="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 text-xs transition">
            Encerrar / Sair
          </button>
        </div>

        ${inspectedAgent ? renderInspectedAgentFullSheet(inspectedAgent) : `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div class="lg:col-span-8 space-y-3">
              <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Fichas dos Agentes Conectados (${roomAgentsCache.length})
              </h4>
              ${roomAgentsCache.length === 0
                ? `<div class="bg-void border border-dashed border-borderSubtle rounded-2xl p-8 text-center text-xs text-zinc-500">
                    Aguardando jogadores entrarem com o código <strong class="accent-text font-mono">${sessionState.roomCode}</strong>...
                  </div>`
                : `<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${roomAgentsCache.map((ag) => {
                      const st = computeGMAgentSummary(ag);
                      const pvPct = Math.min(100, Math.max(0, Math.round(((ag.currentPv ?? st.maxPv) / st.maxPv) * 100)));
                      const pePct = Math.min(100, Math.max(0, Math.round(((ag.currentPe ?? st.maxPe) / st.maxPe) * 100)));
                      const sanPct = Math.min(100, Math.max(0, Math.round(((ag.currentSan ?? st.maxSan) / st.maxSan) * 100)));
                      const attrs = ag.attributes || { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 };

                      return `
                        <div class="bg-void border border-borderSubtle hover:border-purple-500/50 rounded-2xl p-4 space-y-3 transition">
                          <div class="flex items-start justify-between gap-2">
                            <div>
                              <h5 class="font-bold text-sm text-white">${ag.name || "Agente Sem Nome"}</h5>
                              <p class="text-[11px] text-zinc-400">${ag.charClass} • ${ag.path} • NEX ${ag.nex}%</p>
                              <p class="text-[10px] font-mono text-zinc-500">Jogador: ${ag.playerAlias || ag.player || "—"} • Origem: ${ag.origin}</p>
                            </div>
                            <div class="text-right font-mono text-xs">
                              <span class="block px-2 py-0.5 rounded bg-elevated text-white font-bold">Def ${st.defense}</span>
                              <span class="block text-[10px] text-zinc-400 mt-1">DT ${st.ritualDt}</span>
                            </div>
                          </div>

                          <div class="space-y-1.5 text-[11px] font-mono">
                            <div>
                              <div class="flex justify-between">
                                <span class="text-rose-400">PV</span>
                                <span class="text-white">${ag.currentPv ?? st.maxPv}/${st.maxPv}</span>
                              </div>
                              <div class="w-full h-1.5 bg-elevated rounded-full overflow-hidden">
                                <div class="h-full bg-rose-500" style="width:${pvPct}%"></div>
                              </div>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                              <div>
                                <div class="flex justify-between">
                                  <span class="text-amber-300">PE</span>
                                  <span class="text-white">${ag.currentPe ?? st.maxPe}/${st.maxPe}</span>
                                </div>
                                <div class="w-full h-1.5 bg-elevated rounded-full overflow-hidden">
                                  <div class="h-full bg-amber-400" style="width:${pePct}%"></div>
                                </div>
                              </div>
                              <div>
                                <div class="flex justify-between">
                                  <span class="text-sky-300">SAN</span>
                                  <span class="text-white">${ag.currentSan ?? st.maxSan}/${st.maxSan}</span>
                                </div>
                                <div class="w-full h-1.5 bg-elevated rounded-full overflow-hidden">
                                  <div class="h-full bg-sky-400" style="width:${sanPct}%"></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="grid grid-cols-5 gap-1 text-center font-mono text-[11px] bg-surface rounded-lg p-1.5 border border-borderSubtle">
                            <div><span class="text-zinc-500 block text-[9px]">AGI</span><strong class="text-white">${attrs.AGI}</strong></div>
                            <div><span class="text-zinc-500 block text-[9px]">FOR</span><strong class="text-white">${attrs.FOR}</strong></div>
                            <div><span class="text-zinc-500 block text-[9px]">INT</span><strong class="text-white">${attrs.INT}</strong></div>
                            <div><span class="text-zinc-500 block text-[9px]">PRE</span><strong class="text-white">${attrs.PRE}</strong></div>
                            <div><span class="text-zinc-500 block text-[9px]">VIG</span><strong class="text-white">${attrs.VIG}</strong></div>
                          </div>

                          <div class="flex items-center gap-2 pt-1">
                            <button type="button" data-inspect-id="${ag.id}" class="btn-inspect-agent flex-1 py-1.5 rounded-xl accent-bg/20 hover:accent-bg/35 border border-purple-500/40 accent-text text-xs font-semibold transition">
                              👁 Inspecionar Ficha Completa
                            </button>
                            <button type="button" data-kick-id="${ag.id}" title="Remover ficha da sala" class="btn-kick-agent px-2.5 py-1.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-900/40 text-red-300 text-xs">
                              ✕
                            </button>
                          </div>
                        </div>
                      `;
                    }).join("")}
                  </div>`
              }
            </div>

            <div class="lg:col-span-4 space-y-3">
              <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                🎲 Rolagens ao Vivo na Mesa
              </h4>
              <div class="bg-void border border-borderSubtle rounded-2xl p-3 space-y-2 max-h-[460px] overflow-y-auto">
                ${roomRollsCache.length === 0
                  ? `<p class="text-center py-6 text-xs text-zinc-500">Nenhuma rolagem transmitida ainda.</p>`
                  : roomRollsCache.map(r => `
                    <div class="bg-surface border ${r.isCrit ? "border-amber-400/50" : r.isFumble ? "border-rose-500/50" : "border-borderSubtle"} rounded-xl p-2.5 flex items-center justify-between gap-2">
                      <div class="min-w-0">
                        <div class="text-[11px] font-bold accent-text truncate">${r.agentName}</div>
                        <div class="text-xs text-white truncate">${r.title}</div>
                        <div class="text-[10px] font-mono text-zinc-400 truncate">${r.detail}</div>
                      </div>
                      <span class="font-mono text-base font-bold ${r.isCrit ? "text-amber-300" : r.isFumble ? "text-rose-400" : "text-white"} shrink-0">
                        ${r.result}
                      </span>
                    </div>
                  `).join("")
                }
              </div>
            </div>
          </div>
        `}
      `;
    }

    function renderInspectedAgentFullSheet(ag) {
      const st = computeGMAgentSummary(ag);
      const trainedSkills = Object.entries(ag.skills || {})
        .filter(([, data]) => (data.rank || 0) >= 5)
        .map(([name, data]) => `${name} (+${data.rank + (data.other || 0)})`);
      const field = (key, label, value, type = "text") => `
        <label class="block text-[11px] text-zinc-400">${label}
          <input name="${key}" type="${type}" value="${String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")}"
            class="mt-1 w-full bg-void border border-borderSubtle rounded-lg px-2.5 py-2 text-xs text-white outline-none" />
        </label>
      `;
      const jsonField = (key, label, value) => `
        <label class="block text-[11px] text-zinc-400">${label} (JSON)
          <textarea name="${key}" rows="5" spellcheck="false"
            class="mt-1 w-full bg-void border border-borderSubtle rounded-lg px-2.5 py-2 text-[11px] font-mono text-white outline-none">${JSON.stringify(value ?? (key === "skills" ? {} : []), null, 2).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</textarea>
        </label>
      `;

      return `
        <div class="bg-void border border-borderSubtle rounded-2xl p-5 space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-borderSubtle pb-3">
            <div>
              <button type="button" id="btn-gm-back-overview" class="text-xs accent-text hover:underline mb-1">← Voltar para todas as fichas</button>
              <h4 class="text-lg font-bold text-white">${ag.name} <span class="text-xs font-mono text-zinc-400">(${ag.charClass} • ${ag.path} • NEX ${ag.nex}%)</span></h4>
              <p class="text-xs text-zinc-400">Origem: ${ag.origin} • Patente: ${ag.rank} • Afinidade: ${ag.affinity || "Nenhuma"}</p>
            </div>
            <div class="flex gap-2 font-mono text-xs">
              <span class="px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30">PV: ${ag.currentPv}/${st.maxPv}</span>
              <span class="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">PE: ${ag.currentPe}/${st.maxPe}</span>
              <span class="px-3 py-1.5 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-500/30">SAN: ${ag.currentSan}/${st.maxSan}</span>
              <span class="px-3 py-1.5 rounded-xl bg-elevated text-white border border-borderSubtle">Defesa: ${st.defense}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div class="bg-surface border border-borderSubtle rounded-xl p-3.5 space-y-2">
              <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Perícias Treinadas</h5>
              <p class="text-zinc-300 leading-relaxed font-mono text-[11px]">${trainedSkills.length ? trainedSkills.join(", ") : "Nenhuma perícia treinada."}</p>
            </div>

            <div class="bg-surface border border-borderSubtle rounded-xl p-3.5 space-y-2">
              <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Inventário & Armas (${(ag.inventory || []).length})</h5>
              <ul class="space-y-1 text-zinc-300">
                ${(ag.inventory || []).map(it => `<li>• <strong>${it.name}</strong> (${it.type}${it.damage ? ` — ${it.damage}` : ""})</li>`).join("") || "<li>Mochila vazia</li>"}
              </ul>
            </div>

            <div class="bg-surface border border-borderSubtle rounded-xl p-3.5 space-y-2">
              <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Poderes & Rituais</h5>
              <ul class="space-y-1 text-zinc-300">
                ${(ag.abilities || []).map(ab => `<li>★ <strong>${ab.name}</strong></li>`).join("")}
                ${(ag.rituals || []).map(r => `<li>📜 <strong>${r.name}</strong> (${r.element} ${r.circle}º)</li>`).join("")}
                ${!(ag.abilities?.length || ag.rituals?.length) ? "<li>Nenhum poder ou ritual registrado</li>" : ""}
              </ul>
            </div>
          </div>

          ${ag.notes || ag.clues ? `
            <div class="bg-surface border border-borderSubtle rounded-xl p-3.5 text-xs space-y-1">
              <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Notas do Jogador</h5>
              <p class="text-zinc-400 whitespace-pre-line">${ag.notes || ""}\n${ag.clues || ""}</p>
            </div>
          ` : ""}
          <details class="bg-surface border border-purple-500/30 rounded-xl p-4">
            <summary class="cursor-pointer text-sm font-semibold text-purple-200">✏️ Editar ficha do agente</summary>
            <form id="gm-agent-edit-form" data-agent-id="${ag.id}" class="mt-4 space-y-4">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                ${field("name", "Nome", ag.name)}
                ${field("player", "Nome do jogador", ag.player || ag.playerAlias)}
                ${field("charClass", "Classe", ag.charClass)}
                ${field("path", "Trilha", ag.path)}
                ${field("origin", "Origem", ag.origin)}
                ${field("rank", "Patente", ag.rank)}
                ${field("affinity", "Afinidade", ag.affinity)}
                ${field("combatenteAttackSkill", "Perícia de ataque", ag.combatenteAttackSkill)}
                ${field("combatenteDefenseSkill", "Perícia de defesa", ag.combatenteDefenseSkill)}
                ${field("nex", "NEX (%)", ag.nex, "number")}
                ${field("currentPv", "PV atuais", ag.currentPv ?? st.maxPv, "number")}
                ${field("currentPe", "PE atuais", ag.currentPe ?? st.maxPe, "number")}
                ${field("currentSan", "SAN atual", ag.currentSan ?? st.maxSan, "number")}
                ${field("bonusPv", "Bônus PV máx.", ag.bonusPv || 0, "number")}
                ${field("bonusPe", "Bônus PE máx.", ag.bonusPe || 0, "number")}
                ${field("bonusSan", "Bônus SAN máx.", ag.bonusSan || 0, "number")}
                ${field("pp", "Pontos de Prestígio", ag.pp || 0, "number")}
                ${field("speed", "Deslocamento", ag.speed || 0, "number")}
                ${field("defenseOther", "Bônus de Defesa", ag.defenseOther || 0, "number")}
                ${["AGI", "FOR", "INT", "PRE", "VIG"].map((attr) => field(`attribute-${attr}`, attr, ag.attributes?.[attr] ?? 1, "number")).join("")}
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${field("rd", "Resistências / RD", ag.rd)}
                ${field("proficiencies", "Proficiências", ag.proficiencies)}
              </div>
              <label class="block text-[11px] text-zinc-400">Notas<textarea name="notes" rows="3" class="mt-1 w-full bg-void border border-borderSubtle rounded-lg px-2.5 py-2 text-xs text-white outline-none">${String(ag.notes || "").replace(/&/g, "&amp;").replace(/</g, "&lt;")}</textarea></label>
              <label class="block text-[11px] text-zinc-400">Pistas<textarea name="clues" rows="3" class="mt-1 w-full bg-void border border-borderSubtle rounded-lg px-2.5 py-2 text-xs text-white outline-none">${String(ag.clues || "").replace(/&/g, "&amp;").replace(/</g, "&lt;")}</textarea></label>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                ${jsonField("skills", "Perícias", ag.skills)}
                ${jsonField("peritoSkills", "Perícias de Especialista", ag.peritoSkills)}
                ${jsonField("inventory", "Inventário", ag.inventory)}
                ${jsonField("abilities", "Poderes", ag.abilities)}
                ${jsonField("rituals", "Rituais", ag.rituals)}
              </div>
              <div class="flex justify-end">
                <button type="submit" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold">Salvar alterações no agente</button>
              </div>
            </form>
          </details>
        </div>
      `;
    }

    async function saveInspectedAgentEdits(form) {
      if (sessionState.role !== "gm" || !currentUser || !sessionState.roomCode) return;
      const formData = new FormData(form);
      const agentId = form.dataset.agentId;
      const numberKeys = ["nex", "currentPv", "currentPe", "currentSan", "bonusPv", "bonusPe", "bonusSan", "pp", "speed", "defenseOther"];
      const updates = {};
      ["name", "player", "charClass", "path", "origin", "rank", "affinity", "combatenteAttackSkill", "combatenteDefenseSkill", "rd", "proficiencies", "notes", "clues"].forEach((key) => {
        updates[key] = String(formData.get(key) || "").trim();
      });
      for (const key of numberKeys) {
        const value = Number(formData.get(key));
        if (!Number.isInteger(value) || (value < 0 && key !== "defenseOther")) {
          alertModalInfo(`O campo ${key} precisa ser um número inteiro${key === "defenseOther" ? "" : " não negativo"}.`);
          return;
        }
        updates[key] = value;
      }
      if (updates.nex > 99) {
        alertModalInfo("O NEX deve estar entre 0 e 99.");
        return;
      }
      updates.attributes = {};
      for (const attr of ["AGI", "FOR", "INT", "PRE", "VIG"]) {
        const value = Number(formData.get(`attribute-${attr}`));
        if (!Number.isInteger(value) || value < 0) {
          alertModalInfo(`O atributo ${attr} precisa ser um número inteiro não negativo.`);
          return;
        }
        updates.attributes[attr] = value;
      }
      for (const key of ["skills", "peritoSkills", "inventory", "abilities", "rituals"]) {
        try {
          updates[key] = JSON.parse(String(formData.get(key)));
          if (key === "skills" ? !updates[key] || Array.isArray(updates[key]) || typeof updates[key] !== "object" : !Array.isArray(updates[key])) {
            throw new Error(key === "skills" ? "deve ser um objeto JSON" : "deve ser uma lista JSON");
          }
        } catch (err) {
          alertModalInfo(`JSON inválido em ${key}: ${err.message || err}`);
          return;
        }
      }

      try {
        const roomRef = doc(db, "sessions", sessionState.roomCode);
        const agentRef = doc(db, "sessions", sessionState.roomCode, "agents", agentId);
        await runTransaction(db, async (transaction) => {
          const roomSnap = await transaction.get(roomRef);
          if (!roomSnap.exists() || roomSnap.data().gmUid !== currentUser.uid) {
            throw new Error("Esta conta não é o Mestre proprietário da sala.");
          }
          const agentSnap = await transaction.get(agentRef);
          if (!agentSnap.exists()) throw new Error("A ficha não está mais nesta sala.");
          const agent = agentSnap.data();
          transaction.update(agentRef, {
            ...updates,
            gmRevision: (Number(agent.gmRevision) || 0) + 1,
            gmEditedByUid: currentUser.uid,
            gmEditedAt: Date.now()
          });
        });
        alertModalInfo("Ficha atualizada. O jogador receberá as alterações automaticamente.");
      } catch (err) {
        console.error("[Ordo Sync] Erro ao salvar edição do Mestre:", err);
        alertModalInfo(`Não foi possível salvar a ficha (${err.code || "erro"}): ${err.message || "Confira as regras do Firestore."}`);
      }
    }

    // Delegação global de cliques para todos os botões da Mesa / Escudo do Mestre
    document.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      if (!target) return;

      if (target.id === "btn-open-session-hub") {
        e.preventDefault();
        const modal = document.getElementById("modal-multiplayer-session");
        if (modal) {
          modal.classList.remove("hidden");
          modal.classList.add("flex");
          renderSessionModalBody();
        }
      } else if (target.id === "btn-close-session-modal") {
        const modal = document.getElementById("modal-multiplayer-session");
        if (modal) {
          modal.classList.add("hidden");
          modal.classList.remove("flex");
        }
      } else if (target.id === "btn-google-login") {
        loginWithGoogle();
      } else if (target.id === "btn-google-logout") {
        logoutFirebaseUser();
      } else if (target.id === "btn-create-gm-room") {
        createSessionAsGM();
      } else if (target.id === "btn-join-player-room") {
        joinSessionAsPlayer();
      } else if (target.id === "btn-rejoin-gm-room") {
        rejoinAsGM();
      } else if (target.id === "btn-force-sync-now") {
        pushActiveAgentToRoom();
      } else if (target.id === "btn-leave-room" || target.id === "btn-leave-gm-room") {
        leaveSession();
      } else if (target.id === "btn-copy-room-code") {
        const temp = document.createElement("input");
        temp.value = sessionState.roomCode;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();
        target.textContent = "✓ Copiado!";
        setTimeout(() => { target.textContent = "📋 Copiar Código"; }, 2000);
      } else if (target.classList.contains("btn-inspect-agent")) {
        inspectedAgentId = target.getAttribute("data-inspect-id");
        renderSessionModalBody();
      } else if (target.classList.contains("btn-kick-agent")) {
        removeAgentFromSession(target.getAttribute("data-kick-id"));
      } else if (target.id === "btn-gm-back-overview") {
        inspectedAgentId = null;
        renderSessionModalBody();
      }
    });
    document.addEventListener("submit", (e) => {
      if (e.target?.id === "gm-agent-edit-form") {
        e.preventDefault();
        saveInspectedAgentEdits(e.target);
      }
    });

    function bootMultiplayerModule() {
      injectMultiplayerUI();
      setupRollObserver();
      initFirebaseSync();
      setInterval(() => {
        if (!document.getElementById("btn-open-session-hub")) {
          injectMultiplayerUI();
        }
      }, 1500);
    }

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", bootMultiplayerModule);
    } else {
      bootMultiplayerModule();
    }
})();
