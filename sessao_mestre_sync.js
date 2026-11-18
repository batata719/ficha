/**
 * ============================================================================
 * ORDO REALITAS // MÓDULO DE SESSÕES & ESCUDO DO MESTRE EM TEMPO REAL
 * ============================================================================
 * Como funciona sem alterar seu código original:
 * 1. Injeta automaticamente o botão "🌐 Mesa / Sessão" na barra superior.
 * 2. Intercepta de forma segura o salvamento da ficha (localStorage.setItem)
 *    para enviar atualizações em tempo real para a sala conectada.
 * 3. Permite ao Mestre criar uma sala (código de 6 caracteres) e visualizar
 *    em tempo real PV, PE, SAN, Defesa, Atributos, Perícias, Inventário,
 *    Rituais e até as últimas rolagens de dados de todos os jogadores!
 * ============================================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ============================================================================
// 1. COLE AQUI AS CREDENCIAIS DO SEU PROJETO FIREBASE (Veja o Tutorial!)
// ============================================================================
const firebaseConfig = {
  apiKey: "AIzaSyDKc688y119WyFzE5yGmxkaeYQBtLlI3FM",
  authDomain: "ordo-realitas-mesa.firebaseapp.com",
  projectId: "ordo-realitas-mesa",
  storageBucket: "ordo-realitas-mesa.firebasestorage.app",
  messagingSenderId: "1049343664232",
  appId: "1:1049343664232:web:00818b1ce7f88101931bdd"
};

// ============================================================================
// 2. INICIALIZAÇÃO SEGURA DO FIREBASE
// ============================================================================
let db = null;
let auth = null;
let currentUser = null;
let firebaseReady = false;

const SESSION_META_KEY = "op_multiplayer_session_v1";
let sessionState = loadSessionMeta();
let unsubscribeRoomAgents = null;
let unsubscribeRoomRolls = null;
let roomAgentsCache = [];
let roomRollsCache = [];
let inspectedAgentId = null;

function loadSessionMeta() {
  try {
    const raw = localStorage.getItem(SESSION_META_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    roomCode: null,
    role: null, // 'gm' (Mestre) ou 'player' (Jogador)
    gmSecret: null,
    playerAlias: ""
  };
}

function saveSessionMeta() {
  localStorage.setItem(SESSION_META_KEY, JSON.stringify(sessionState));
}

async function initFirebaseSync() {
  if (!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === "SUA_API_KEY_AQUI") {
    console.warn("[Ordo Sync] Configure suas credenciais FIREBASE_CONFIG em sessao_mestre_sync.js.");
    return false;
  }
  try {
    const app = initializeApp(FIREBASE_CONFIG);
    auth = getAuth(app);
    db = getFirestore(app);
    const cred = await signInAnonymously(auth);
    currentUser = cred.user;
    firebaseReady = true;
    updateConnectionBadge();

    // Reconecta automaticamente se já estava em uma sala antes de recarregar
    if (sessionState.roomCode && sessionState.role) {
      connectToRoomListeners(sessionState.roomCode);
      if (sessionState.role === "player") {
        pushActiveAgentToRoom();
      }
    }
    return true;
  } catch (err) {
    console.error("[Ordo Sync] Falha ao conectar no Firebase:", err);
    return false;
  }
}

// ============================================================================
// 3. INTERCEPTAÇÃO NÃO-INTRUSIVA DA FICHA (SINCRONIZAÇÃO AUTOMÁTICA)
// ============================================================================
const originalSetItem = localStorage.setItem.bind(localStorage);
let syncDebounceTimer = null;

localStorage.setItem = function (key, value) {
  originalSetItem(key, value);
  if (key === "op_agents_roster_v1" && sessionState.roomCode && sessionState.role === "player") {
    clearTimeout(syncDebounceTimer);
    syncDebounceTimer = setTimeout(() => {
      pushActiveAgentToRoom();
    }, 350);
  }
};

// Também observa o container de toasts para transmitir rolagens ao vivo para o Mestre!
function setupRollObserver() {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const observer = new MutationObserver((mutations) => {
    if (!firebaseReady || !sessionState.roomCode || sessionState.role !== "player") return;

    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const title = node.querySelector("span.text-xs.font-semibold")?.textContent || "Rolagem";
          const detail = node.querySelector("p.text-xs.font-mono")?.textContent || "";
          const result = node.querySelector("div.text-2xl.font-mono")?.textContent?.trim() || "";
          const isCrit = node.className.includes("border-amber-400");
          const isFumble = node.className.includes("border-rose-500");

          // Ignora toasts administrativos do próprio sistema
          if (title.includes("Sessão") || title.includes("Salvo") || title.includes("Exportação")) return;

          broadcastRollToRoom({ title, detail, result, isCrit, isFumble });
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
  if (!firebaseReady || !currentUser || !sessionState.roomCode || sessionState.role !== "player") return;
  const activeAgent = getCurrentLocalAgent();
  if (!activeAgent) return;

  try {
    const agentDocRef = doc(db, "sessions", sessionState.roomCode, "agents", activeAgent.id);
    await setDoc(agentDocRef, {
      ...activeAgent,
      ownerUid: currentUser.uid,
      playerAlias: sessionState.playerAlias || activeAgent.player || "Jogador",
      syncedAt: Date.now()
    });
  } catch (err) {
    console.error("[Ordo Sync] Erro ao enviar ficha:", err);
  }
}

async function broadcastRollToRoom(rollPayload) {
  if (!firebaseReady || !currentUser || !sessionState.roomCode) return;
  const activeAgent = getCurrentLocalAgent();
  const rollId = `roll_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  try {
    const rollRef = doc(db, "sessions", sessionState.roomCode, "rolls", rollId);
    await setDoc(rollRef, {
      ...rollPayload,
      agentName: activeAgent?.name || "Agente",
      playerAlias: sessionState.playerAlias || activeAgent?.player || "Jogador",
      timestamp: Date.now()
    });
  } catch (err) {
    console.error("[Ordo Sync] Erro ao transmitir rolagem:", err);
  }
}

// ============================================================================
// 4. CRIAÇÃO E ENTRADA EM SALAS (MESTRE & JOGADOR)
// ============================================================================
function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

async function createSessionAsGM() {
  if (!firebaseReady) {
    const ok = await initFirebaseSync();
    if (!ok) {
      alertModalInfo("Configure suas chaves do Firebase no arquivo sessao_mestre_sync.js primeiro (veja o tutorial).");
      return;
    }
  }

  const campaignName = document.getElementById("sync-campaign-name")?.value.trim() || "Missão Ordo Realitas";
  const roomCode = generateRoomCode();
  const gmSecret = Math.random().toString(36).substring(2, 10);

  const roomRef = doc(db, "sessions", roomCode);
  await setDoc(roomRef, {
    roomCode,
    campaignName,
    gmUid: currentUser.uid,
    gmSecret,
    createdAt: serverTimestamp()
  });

  sessionState = {
    roomCode,
    role: "gm",
    gmSecret,
    playerAlias: "Mestre"
  };
  saveSessionMeta();
  updateConnectionBadge();
  connectToRoomListeners(roomCode);
  renderSessionModalBody();
}

async function joinSessionAsPlayer() {
  if (!firebaseReady) {
    const ok = await initFirebaseSync();
    if (!ok) {
      alertModalInfo("Configure suas chaves do Firebase no arquivo sessao_mestre_sync.js primeiro.");
      return;
    }
  }

  const codeInput = (document.getElementById("sync-join-code")?.value || "").trim().toUpperCase();
  const aliasInput = (document.getElementById("sync-player-alias")?.value || "").trim();

  if (codeInput.length < 4) {
    alertModalInfo("Digite um código de sala válido (ex: A7K9P2).");
    return;
  }

  const roomRef = doc(db, "sessions", codeInput);
  const snap = await getDoc(roomRef);
  if (!snap.exists()) {
    alertModalInfo(`Sala "${codeInput}" não encontrada. Verifique o código com o Mestre.`);
    return;
  }

  sessionState = {
    roomCode: codeInput,
    role: "player",
    gmSecret: null,
    playerAlias: aliasInput || "Agente"
  };
  saveSessionMeta();
  updateConnectionBadge();
  connectToRoomListeners(codeInput);
  await pushActiveAgentToRoom();
  renderSessionModalBody();
}

async function rejoinAsGM() {
  if (!firebaseReady) {
    const ok = await initFirebaseSync();
    if (!ok) return;
  }
  const codeInput = (document.getElementById("sync-join-code")?.value || "").trim().toUpperCase();
  const roomRef = doc(db, "sessions", codeInput);
  const snap = await getDoc(roomRef);
  if (!snap.exists()) {
    alertModalInfo(`Sala "${codeInput}" não encontrada.`);
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

// ============================================================================
// 5. LISTENERS EM TEMPO REAL (FIRESTORE ONSNAPSHOT)
// ============================================================================
function connectToRoomListeners(roomCode) {
  if (unsubscribeRoomAgents) unsubscribeRoomAgents();
  if (unsubscribeRoomRolls) unsubscribeRoomRolls();

  const agentsCol = collection(db, "sessions", roomCode, "agents");
  unsubscribeRoomAgents = onSnapshot(
    agentsCol,
    (snapshot) => {
      roomAgentsCache = [];
      snapshot.forEach((docSnap) => {
        roomAgentsCache.push(docSnap.data());
      });
      roomAgentsCache.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      renderSessionModalBody();
    },
    (err) => console.error("[Ordo Sync] Erro listener agentes:", err)
  );

  const rollsCol = collection(db, "sessions", roomCode, "rolls");
  unsubscribeRoomRolls = onSnapshot(
    rollsCol,
    (snapshot) => {
      roomRollsCache = [];
      snapshot.forEach((docSnap) => {
        roomRollsCache.push(docSnap.data());
      });
      roomRollsCache.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      roomRollsCache = roomRollsCache.slice(0, 25);
      renderSessionModalBody();
    },
    (err) => console.error("[Ordo Sync] Erro listener rolagens:", err)
  );
}

// ============================================================================
// 6. CÁLCULO AUXILIAR PARA O ESCUDO DO MESTRE
// ============================================================================
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

// ============================================================================
// 7. INJEÇÃO DA INTERFACE VISUAL (BOTÃO NA BARRA + MODAL DO ESCUDO DO MESTRE)
// ============================================================================
function injectMultiplayerUI() {
  // 1. Injeta botão na barra superior existente sem alterar o HTML original
  const topBarRight = document.querySelector("body > div:first-child .max-w-7xl > div:last-child");
  if (topBarRight && !document.getElementById("btn-open-session-hub")) {
    const btn = document.createElement("button");
    btn.id = "btn-open-session-hub";
    btn.className = "px-2.5 py-1 rounded-md bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/40 text-purple-200 font-semibold transition flex items-center gap-1.5";
    btn.innerHTML = `<span>🌐</span> <span id="session-btn-label">Mesa / Sessão</span>`;
    btn.onclick = () => {
      const modal = document.getElementById("modal-multiplayer-session");
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      renderSessionModalBody();
    };
    topBarRight.prepend(btn);
  }

  // 2. Injeta o Modal do Escudo do Mestre / Conexão de Sessão
  if (!document.getElementById("modal-multiplayer-session")) {
    const modal = document.createElement("div");
    modal.id = "modal-multiplayer-session";
    modal.className = "fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden items-center justify-center p-4";
    modal.innerHTML = `
      <div class="bg-[#111114] border border-[#26262e] rounded-2xl max-w-6xl w-full p-6 flex flex-col max-h-[92vh] space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-[#26262e] pb-3">
          <div class="flex items-center gap-3">
            <span class="text-xl">🌐</span>
            <div>
              <h3 class="text-base font-bold text-white">Servidores & Escudo do Mestre (Tempo Real)</h3>
              <p class="text-xs text-zinc-400">Sincronize fichas da equipe ao vivo durante a sessão de Ordem Paranormal</p>
            </div>
          </div>
          <button id="btn-close-session-modal" class="text-zinc-400 hover:text-white text-lg px-2">✕</button>
        </div>
        <div id="session-modal-alert" class="hidden bg-rose-950/50 border border-rose-700/60 text-rose-200 text-xs rounded-xl px-3.5 py-2.5"></div>
        <div id="session-modal-body" class="overflow-y-auto flex-1 pr-1 space-y-4"></div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("btn-close-session-modal").onclick = () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    };
  }

  updateConnectionBadge();
}

function alertModalInfo(msg) {
  const el = document.getElementById("session-modal-alert");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 6000);
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

  // CASO A: Não conectado a nenhuma sala -> Tela de Criar Sala (Mestre) ou Entrar (Jogador)
  if (!sessionState.roomCode) {
    body.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 py-2">
        <!-- Lado do Mestre -->
        <div class="bg-[#09090b] border border-purple-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div class="space-y-2">
            <span class="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Para o Mestre da Mesa
            </span>
            <h4 class="text-lg font-bold text-white">Criar Novo Servidor / Sessão</h4>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Gera um código exclusivo de 6 letras. Todos os jogadores que entrarem terão suas fichas, PV, PE, Sanidade, Inventário e Rolagens exibidos ao vivo no seu Escudo do Mestre.
            </p>
            <div class="pt-2">
              <label class="block text-xs text-zinc-400 mb-1">Nome da Campanha / Operação</label>
              <input type="text" id="sync-campaign-name" placeholder="Ex: O Segredo na Floresta - Sessão 04"
                class="w-full bg-[#111114] border border-[#26262e] rounded-xl px-3 py-2 text-xs text-white outline-none" />
            </div>
          </div>
          <button id="btn-create-gm-room" class="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition">
            Criar Sala como Mestre →
          </button>
        </div>

        <!-- Lado do Jogador -->
        <div class="bg-[#09090b] border border-[#26262e] rounded-2xl p-5 flex flex-col justify-between gap-4">
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
                  class="w-full bg-[#111114] border border-[#26262e] rounded-xl px-3 py-2 text-xs font-mono uppercase text-white outline-none" />
              </div>
              <div>
                <label class="block text-xs text-zinc-400 mb-1">Seu Nome (Jogador)</label>
                <input type="text" id="sync-player-alias" placeholder="Ex: Lucas"
                  class="w-full bg-[#111114] border border-[#26262e] rounded-xl px-3 py-2 text-xs text-white outline-none" />
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <button id="btn-join-player-room" class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition">
              Conectar Ficha Ativa →
            </button>
            <button id="btn-rejoin-gm-room" title="Reabrir uma sala existente como Mestre" class="px-3 py-2.5 rounded-xl bg-[#18181d] hover:bg-zinc-800 border border-[#26262e] text-zinc-300 text-xs transition">
              Entrar como Mestre
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("btn-create-gm-room").onclick = createSessionAsGM;
    document.getElementById("btn-join-player-room").onclick = joinSessionAsPlayer;
    document.getElementById("btn-rejoin-gm-room").onclick = rejoinAsGM;
    return;
  }

  // CASO B: Jogador Conectado -> Status de sincronização + Resumo da equipe
  if (sessionState.role === "player") {
    const activeAg = getCurrentLocalAgent();
    body.innerHTML = `
      <div class="bg-[#09090b] border border-emerald-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
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
          <button id="btn-force-sync-now" class="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 text-xs font-semibold transition">
            🔄 Sincronizar Agora
          </button>
          <button id="btn-leave-room" class="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 text-xs transition">
            Sair da Sala
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Agentes Conectados nesta Sessão (${roomAgentsCache.length})</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${roomAgentsCache.map(ag => `
            <div class="bg-[#09090b] border border-[#26262e] rounded-xl p-3 flex items-center justify-between">
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
    document.getElementById("btn-force-sync-now").onclick = () => pushActiveAgentToRoom();
    document.getElementById("btn-leave-room").onclick = leaveSession;
    return;
  }

  // CASO C: MESTRE CONECTADO -> ESCUDO DO MESTRE COMPLETO EM TEMPO REAL
  const inspectedAgent = roomAgentsCache.find((a) => a.id === inspectedAgentId) || null;

  body.innerHTML = `
    <!-- Barra de Controle da Sala do Mestre -->
    <div class="bg-[#09090b] border border-purple-500/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-4">
        <div>
          <span class="block text-[10px] font-mono uppercase text-zinc-400">Código para os Jogadores</span>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-mono font-bold tracking-widest text-purple-300">${sessionState.roomCode}</span>
            <button id="btn-copy-room-code" class="px-2.5 py-1 rounded-lg bg-[#18181d] hover:bg-zinc-800 border border-[#26262e] text-[11px] text-zinc-200 transition">
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

      <button id="btn-leave-gm-room" class="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 text-xs transition">
        Encerrar / Sair
      </button>
    </div>

    ${inspectedAgent ? renderInspectedAgentFullSheet(inspectedAgent) : `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <!-- Grid de Fichas dos Jogadores (8 colunas) -->
        <div class="lg:col-span-8 space-y-3">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Fichas dos Agentes Conectados (${roomAgentsCache.length})
          </h4>
          ${roomAgentsCache.length === 0
            ? `<div class="bg-[#09090b] border border-dashed border-[#26262e] rounded-2xl p-8 text-center text-xs text-zinc-500">
                Aguardando jogadores entrarem com o código <strong class="text-purple-300 font-mono">${sessionState.roomCode}</strong>...
              </div>`
            : `<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${roomAgentsCache.map((ag) => {
                  const st = computeGMAgentSummary(ag);
                  const pvPct = Math.min(100, Math.max(0, Math.round(((ag.currentPv ?? st.maxPv) / st.maxPv) * 100)));
                  const pePct = Math.min(100, Math.max(0, Math.round(((ag.currentPe ?? st.maxPe) / st.maxPe) * 100)));
                  const sanPct = Math.min(100, Math.max(0, Math.round(((ag.currentSan ?? st.maxSan) / st.maxSan) * 100)));
                  const attrs = ag.attributes || { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 };

                  return `
                    <div class="bg-[#09090b] border border-[#26262e] hover:border-purple-500/50 rounded-2xl p-4 space-y-3 transition">
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <h5 class="font-bold text-sm text-white">${ag.name || "Agente Sem Nome"}</h5>
                          <p class="text-[11px] text-zinc-400">${ag.charClass} • ${ag.path} • NEX ${ag.nex}%</p>
                          <p class="text-[10px] font-mono text-zinc-500">Jogador: ${ag.playerAlias || ag.player || "—"} • Origem: ${ag.origin}</p>
                        </div>
                        <div class="text-right font-mono text-xs">
                          <span class="block px-2 py-0.5 rounded bg-[#18181d] text-white font-bold">Def ${st.defense}</span>
                          <span class="block text-[10px] text-zinc-400 mt-1">DT ${st.ritualDt}</span>
                        </div>
                      </div>

                      <!-- Barras PV / PE / SAN -->
                      <div class="space-y-1.5 text-[11px] font-mono">
                        <div>
                          <div class="flex justify-between">
                            <span class="text-rose-400">PV</span>
                            <span class="text-white">${ag.currentPv ?? st.maxPv}/${st.maxPv}</span>
                          </div>
                          <div class="w-full h-1.5 bg-[#18181d] rounded-full overflow-hidden">
                            <div class="h-full bg-rose-500" style="width:${pvPct}%"></div>
                          </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <div class="flex justify-between">
                              <span class="text-amber-300">PE</span>
                              <span class="text-white">${ag.currentPe ?? st.maxPe}/${st.maxPe}</span>
                            </div>
                            <div class="w-full h-1.5 bg-[#18181d] rounded-full overflow-hidden">
                              <div class="h-full bg-amber-400" style="width:${pePct}%"></div>
                            </div>
                          </div>
                          <div>
                            <div class="flex justify-between">
                              <span class="text-sky-300">SAN</span>
                              <span class="text-white">${ag.currentSan ?? st.maxSan}/${st.maxSan}</span>
                            </div>
                            <div class="w-full h-1.5 bg-[#18181d] rounded-full overflow-hidden">
                              <div class="h-full bg-sky-400" style="width:${sanPct}%"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Atributos Compactos -->
                      <div class="grid grid-cols-5 gap-1 text-center font-mono text-[11px] bg-[#111114] rounded-lg p-1.5 border border-[#26262e]">
                        <div><span class="text-zinc-500 block text-[9px]">AGI</span><strong class="text-white">${attrs.AGI}</strong></div>
                        <div><span class="text-zinc-500 block text-[9px]">FOR</span><strong class="text-white">${attrs.FOR}</strong></div>
                        <div><span class="text-zinc-500 block text-[9px]">INT</span><strong class="text-white">${attrs.INT}</strong></div>
                        <div><span class="text-zinc-500 block text-[9px]">PRE</span><strong class="text-white">${attrs.PRE}</strong></div>
                        <div><span class="text-zinc-500 block text-[9px]">VIG</span><strong class="text-white">${attrs.VIG}</strong></div>
                      </div>

                      <div class="flex items-center gap-2 pt-1">
                        <button data-inspect-id="${ag.id}" class="btn-inspect-agent flex-1 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/40 text-purple-200 text-xs font-semibold transition">
                          👁 Inspecionar Ficha Completa
                        </button>
                        <button data-kick-id="${ag.id}" title="Remover ficha da sala" class="btn-kick-agent px-2.5 py-1.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-900/40 text-red-300 text-xs">
                          ✕
                        </button>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>`
          }
        </div>

        <!-- Feed de Rolagens ao Vivo dos Jogadores (4 colunas) -->
        <div class="lg:col-span-4 space-y-3">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            🎲 Rolagens ao Vivo na Mesa
          </h4>
          <div class="bg-[#09090b] border border-[#26262e] rounded-2xl p-3 space-y-2 max-h-[460px] overflow-y-auto">
            ${roomRollsCache.length === 0
              ? `<p class="text-center py-6 text-xs text-zinc-500">Nenhuma rolagem transmitida ainda.</p>`
              : roomRollsCache.map(r => `
                <div class="bg-[#111114] border ${r.isCrit ? "border-amber-400/50" : r.isFumble ? "border-rose-500/50" : "border-[#26262e]"} rounded-xl p-2.5 flex items-center justify-between gap-2">
                  <div class="min-w-0">
                    <div class="text-[11px] font-bold text-purple-300 truncate">${r.agentName}</div>
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

  // Bindings dinâmicos do painel do Mestre
  const copyBtn = document.getElementById("btn-copy-room-code");
  if (copyBtn) {
    copyBtn.onclick = () => {
      const temp = document.createElement("input");
      temp.value = sessionState.roomCode;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
      copyBtn.textContent = "✓ Copiado!";
      setTimeout(() => { copyBtn.textContent = "📋 Copiar Código"; }, 2000);
    };
  }

  const leaveGmBtn = document.getElementById("btn-leave-gm-room");
  if (leaveGmBtn) leaveGmBtn.onclick = leaveSession;

  document.querySelectorAll(".btn-inspect-agent").forEach((btn) => {
    btn.onclick = () => {
      inspectedAgentId = btn.getAttribute("data-inspect-id");
      renderSessionModalBody();
    };
  });

  document.querySelectorAll(".btn-kick-agent").forEach((btn) => {
    btn.onclick = () => removeAgentFromSession(btn.getAttribute("data-kick-id"));
  });

  const backOverviewBtn = document.getElementById("btn-gm-back-overview");
  if (backOverviewBtn) {
    backOverviewBtn.onclick = () => {
      inspectedAgentId = null;
      renderSessionModalBody();
    };
  }
}

function renderInspectedAgentFullSheet(ag) {
  const st = computeGMAgentSummary(ag);
  const trainedSkills = Object.entries(ag.skills || {})
    .filter(([, data]) => (data.rank || 0) >= 5)
    .map(([name, data]) => `${name} (+${data.rank + (data.other || 0)})`);

  return `
    <div class="bg-[#09090b] border border-[#26262e] rounded-2xl p-5 space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#26262e] pb-3">
        <div>
          <button id="btn-gm-back-overview" class="text-xs text-purple-300 hover:underline mb-1">← Voltar para todas as fichas</button>
          <h4 class="text-lg font-bold text-white">${ag.name} <span class="text-xs font-mono text-zinc-400">(${ag.charClass} • ${ag.path} • NEX ${ag.nex}%)</span></h4>
          <p class="text-xs text-zinc-400">Origem: ${ag.origin} • Patente: ${ag.rank} • Afinidade: ${ag.affinity || "Nenhuma"}</p>
        </div>
        <div class="flex gap-2 font-mono text-xs">
          <span class="px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30">PV: ${ag.currentPv}/${st.maxPv}</span>
          <span class="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">PE: ${ag.currentPe}/${st.maxPe}</span>
          <span class="px-3 py-1.5 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-500/30">SAN: ${ag.currentSan}/${st.maxSan}</span>
          <span class="px-3 py-1.5 rounded-xl bg-[#18181d] text-white border border-[#26262e]">Defesa: ${st.defense}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div class="bg-[#111114] border border-[#26262e] rounded-xl p-3.5 space-y-2">
          <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Perícias Treinadas</h5>
          <p class="text-zinc-300 leading-relaxed font-mono text-[11px]">${trainedSkills.length ? trainedSkills.join(", ") : "Nenhuma perícia treinada."}</p>
        </div>

        <div class="bg-[#111114] border border-[#26262e] rounded-xl p-3.5 space-y-2">
          <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Inventário & Armas (${(ag.inventory || []).length})</h5>
          <ul class="space-y-1 text-zinc-300">
            ${(ag.inventory || []).map(it => `<li>• <strong>${it.name}</strong> (${it.type}${it.damage ? ` — ${it.damage}` : ""})</li>`).join("") || "<li>Mochila vazia</li>"}
          </ul>
        </div>

        <div class="bg-[#111114] border border-[#26262e] rounded-xl p-3.5 space-y-2">
          <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Poderes & Rituais</h5>
          <ul class="space-y-1 text-zinc-300">
            ${(ag.abilities || []).map(ab => `<li>★ <strong>${ab.name}</strong></li>`).join("")}
            ${(ag.rituals || []).map(r => `<li>📜 <strong>${r.name}</strong> (${r.element} ${r.circle}º)</li>`).join("")}
            ${!(ag.abilities?.length || ag.rituals?.length) ? "<li>Nenhum poder ou ritual registrado</li>" : ""}
          </ul>
        </div>
      </div>

      ${ag.notes || ag.clues ? `
        <div class="bg-[#111114] border border-[#26262e] rounded-xl p-3.5 text-xs space-y-1">
          <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Notas do Jogador</h5>
          <p class="text-zinc-400 whitespace-pre-line">${ag.notes || ""}\n${ag.clues || ""}</p>
        </div>
      ` : ""}
    </div>
  `;
}

// ============================================================================
// 8. BOOTSTRAP AUTOMÁTICO AO CARREGAR A PÁGINA
// ============================================================================
window.addEventListener("DOMContentLoaded", () => {
  injectMultiplayerUI();
  setupRollObserver();
  initFirebaseSync();
});
