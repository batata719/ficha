window.__multiplayerReady.then(() => (async () => {
    const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
    const { getAuth, signInAnonymously, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
    const {
      getFirestore,
      doc,
      getDocFromServer,
      getDoc,
      setDoc,
      onSnapshot
    } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
    const OBS_FIRE_CONFIG = {
      apiKey: "AIzaSyDKc688y119WyFzE5yGmxkaeYQBtLlI3FM",
      authDomain: "ordo-realitas-mesa.firebaseapp.com",
      projectId: "ordo-realitas-mesa",
      storageBucket: "ordo-realitas-mesa.firebasestorage.app",
      messagingSenderId: "1049343664232",
      appId: "1:1049343664232:web:00818b1ce7f88101931bdd"
    };

    const OBS_CFG_KEY = "op_obs_portrait_settings_v1";
    const obsChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("ordo_obs_portrait_bus") : null;

    // Definição completa das 4 Skins disponíveis

    const obsApp = getApps().find(a => a.name === "obs-portrait-app")
      || initializeApp(OBS_FIRE_CONFIG, "obs-portrait-app");
    const obsAuth = getAuth(obsApp);
    const obsDb = getFirestore(obsApp);

    let obsSyncStatusText = "Conectando ao servidor...";

    const authReadyPromise = new Promise((resolve) => {
      onAuthStateChanged(obsAuth, (user) => {
        if (user) {
          resolve(user);
        } else {
          signInAnonymously(obsAuth)
            .then((cred) => resolve(cred.user))
            .catch((err) => {
              obsSyncStatusText = `Erro Auth (${err?.code || "falha"}): ative Login Anônimo no Firebase`;
              const statusEl = document.getElementById("obs-cloud-status-badge");
              if (statusEl) {
                statusEl.textContent = obsSyncStatusText;
                statusEl.className = "text-[11px] font-mono text-rose-400";
              }
              resolve(null);
            });
        }
      });
    });

    function getObsSettingsMap() {
      try {
        return JSON.parse(localStorage.getItem(OBS_CFG_KEY) || "{}");
      } catch (e) {
        return {};
      }
    }

    function saveObsSettingsForAgent(agentId, cfg) {
      const map = getObsSettingsMap();
      map[agentId] = { ...(map[agentId] || {}), ...cfg };
      localStorage.setItem(OBS_CFG_KEY, JSON.stringify(map));
      broadcastObsSnapshot(null, true);
    }

    function getActiveRosterAgent() {
      try {
        const raw = localStorage.getItem("op_agents_roster_v1");
        if (!raw) return null;
        const roster = JSON.parse(raw);
        if (!roster || !Array.isArray(roster.agents) || roster.agents.length === 0) return null;
        return roster.agents.find(a => a.id === roster.activeId) || roster.agents[0] || null;
      } catch (e) {
        return null;
      }
    }

    function computeObsAgentVitals(ag) {
      if (ag && typeof ag._maxPv === "number" && typeof ag._maxPe === "number" && typeof ag._maxSan === "number") {
        return { maxPv: ag._maxPv, maxPe: ag._maxPe, maxSan: ag._maxSan };
      }
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

      let powerPv = 0, powerPe = 0;
      (ag.abilities || []).forEach(ab => {
        if (ab.name === "Sangue de Ferro") powerPv += level * 2;
        if (ab.name === "Potencial Aprimorado") powerPe += level * (ab.affinity ? 2 : 1);
      });

      const maxPv = Math.max(1, basePv + attrs.VIG + (level - 1) * (perPv + attrs.VIG) + originPv + powerPv + (ag.bonusPv || 0));
      const maxPe = Math.max(1, basePe + attrs.PRE + (level - 1) * (perPe + attrs.PRE) + originPe + powerPe + (ag.bonusPe || 0));
      let maxSan = Math.max(1, baseSan + (level - 1) * perSan + originSan + (ag.bonusSan || 0));
      if (ag.origin === "Cultista Arrependido") maxSan = Math.floor(maxSan / 2);

      return { maxPv, maxPe, maxSan };
    }

    let obsCloudSyncTimer = null;
    function cleanFirestoreValue(value) {
      if (Array.isArray(value)) {
        return value.filter(item => item !== undefined).map(cleanFirestoreValue);
      }
      if (value && typeof value === "object") {
        return Object.fromEntries(
          Object.entries(value)
            .filter(([, item]) => item !== undefined)
            .map(([key, item]) => [key, cleanFirestoreValue(item)])
        );
      }
      return value;
    }

    async function pushObsCloudStream(ag, cfg, rollEvent = null) {
      if (!ag || !ag.id) return;
      try {
        await authReadyPromise;
        const cleanCfg = { ...cfg };
        for (const k of ["avatarNormal", "avatarHurt", "avatarInsane", "avatarDying"]) {
          if (cleanCfg[k] && cleanCfg[k].startsWith("data:")) {
            // Reduz para 200px e qualidade 0.6 para não estourar o limite de 1MB do documento
            cleanCfg[k] = await compressImageDataUrl(cleanCfg[k], 200, 0.6);
          }
        }

        const nowTs = Date.now();
        const rollPayload = rollEvent
          ? {
              title: String(rollEvent.title || "Teste"),
              detail: String(rollEvent.detail || ""),
              result: String(rollEvent.result || ""),
              isCrit: Boolean(rollEvent.isCrit),
              isFumble: Boolean(rollEvent.isFumble),
              rollId: String(rollEvent.rollId || nowTs)
            }
          : null;

        const payload = {
          agent: {
            id: String(ag.id),
            name: String(ag.name || "Agente"),
            charClass: String(ag.charClass || ""),
            path: String(ag.path || ""),
            origin: String(ag.origin || ""),
            nex: Number(ag.nex) || 5,
            affinity: String(ag.affinity || "Nenhuma"),
            attributes: ag.attributes || { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 },
            abilities: Array.isArray(ag.abilities) ? ag.abilities : [],
            currentPv: ag.currentPv ?? 0,
            currentPe: ag.currentPe ?? 0,
            currentSan: ag.currentSan ?? 0,
            updatedAt: Number(ag.updatedAt) || nowTs,
            bonusPv: Number(ag.bonusPv) || 0,
            bonusPe: Number(ag.bonusPe) || 0,
            bonusSan: Number(ag.bonusSan) || 0,
            inventory: (ag.inventory || []).map(it => ({
              id: it.id ?? Date.now(),
              name: String(it.name || ""),
              type: String(it.type || ""),
              skill: String(it.skill || ""),
              equipped: Boolean(it.equipped),
              noAmmo: Boolean(it.noAmmo),
              ammoCurrent: typeof it.ammoCurrent === "number" ? it.ammoCurrent : null,
              ammoMax: typeof it.ammoMax === "number" ? it.ammoMax : null
            }))
          },
          obsCfg: cleanCfg,
          rollEvent: rollPayload,
          updatedAt: nowTs
        };

        const firestorePayload = cleanFirestoreValue(payload);
        await setDoc(doc(obsDb, "sessions", "OBS_LIVE_PORTRAIT", "agents", ag.id), firestorePayload);
        await setDoc(doc(obsDb, "sessions", "OBS_LIVE_PORTRAIT", "agents", "latest_active_agent"), firestorePayload);

        const hora = new Date(nowTs).toLocaleTimeString("pt-BR");
        obsSyncStatusText = `✓ Sincronizado com o OBS (${hora})`;
        const statusEl = document.getElementById("obs-cloud-status-badge");
        if (statusEl) {
          statusEl.textContent = obsSyncStatusText;
          statusEl.className = "text-[11px] font-mono text-emerald-400";
        }
      } catch (err) {
        const errorCode = err?.code || "desconhecido";
        const errorDetail = errorCode === "invalid-argument"
          ? `Dados inválidos enviados ao Firestore: ${err?.message || "revise os dados da ficha."}`
          : errorCode === "permission-denied"
            ? "Acesso negado: confira as regras do Firestore."
            : errorCode === "unauthenticated"
              ? "Sem autenticação: habilite o Login Anônimo no Firebase."
              : err?.message || "Falha ao sincronizar o Portrait.";
        obsSyncStatusText = `⚠ Erro Firestore (${errorCode}): ${errorDetail}`;
        const statusEl = document.getElementById("obs-cloud-status-badge");
        if (statusEl) {
          statusEl.textContent = obsSyncStatusText;
          statusEl.className = "text-[11px] font-mono text-rose-400";
        }
      }
    }

    function broadcastObsSnapshot(rollEvent = null, immediate = false) {
      const ag = getActiveRosterAgent();
      if (!ag) return;
      const cfg = getObsSettingsMap()[ag.id] || {};
      const rollWithId = rollEvent
        ? { ...rollEvent, rollId: rollEvent.rollId || `${Date.now()}_${Math.random().toString(36).slice(2, 7)}` }
        : null;

      const payload = {
        type: "OBS_PORTRAIT_UPDATE",
        agent: ag,
        obsCfg: cfg,
        rollEvent: rollWithId,
        ts: Date.now()
      };
      if (obsChannel) obsChannel.postMessage(payload);

      clearTimeout(obsCloudSyncTimer);
      if (immediate) {
        pushObsCloudStream(ag, cfg, rollWithId);
      } else {
        obsCloudSyncTimer = setTimeout(() => {
          pushObsCloudStream(ag, cfg, rollWithId);
        }, rollWithId ? 20 : 100);
      }
    }

    // ==================== 1. MODO OVERLAY TRANSPARENTE (?obs=1) ====================
    const urlParams = new URLSearchParams(window.location.search);
    const isObsMode = urlParams.get("obs") === "1";

    if (isObsMode) {
      document.documentElement.classList.add("obs-stream-mode");

      const targetAgentId = urlParams.get("agent") || null;
      const targetRoomCode = (urlParams.get("room") || "").trim().toUpperCase();
      const layoutMode = urlParams.get("layout") || "webcam";
      const forcedSkinParam = urlParams.get("skin") || null;
      const hideBarsParam = urlParams.get("bars") === "0";
      const hideDiceParam = urlParams.get("dice") === "0";
      const embeddedData = decodeStandalonePayload(urlParams.get("d"));

      const stage = document.createElement("div");
      stage.id = "obs-stream-stage";
      stage.className = layoutMode === "webcam"
        ? "w-screen h-screen flex items-end justify-start p-5 select-none relative"
        : "w-screen h-screen flex items-end justify-center p-5 select-none relative";
      document.body.appendChild(stage);

      let currentObsAgent = embeddedData?.agent?.name ? embeddedData.agent : null;
      let currentObsCfg = embeddedData?.obsCfg || {};
      let lastObsAgentUpdatedAt = Number(currentObsAgent?.updatedAt) || 0;
      let lastRollTimeout = null;
      const shownRollIds = new Set();
      let lastRenderedHash = "";
      let activeRollHtml = "";

      function getActiveSkin(cfg) {
        const key = forcedSkinParam || cfg?.skin || "dossier";
        return OBS_SKINS[key] || OBS_SKINS.dossier;
      }

      function showObsDiagnostic(msg) {
        if (currentObsAgent) return;
        stage.innerHTML = `
          <div class="skin-dossier-card p-4 max-w-md obs-font-typewriter text-xs space-y-1">
            <div class="obs-font-stamp font-bold text-sm text-[#7f1d1d]">AGUARDANDO SINAL DA FICHA...</div>
            <p class="text-[#3b3129]">${msg}</p>
          </div>
        `;
      }

      function triggerObsRollPopup(rollEvent, skin) {
        if (hideDiceParam || !rollEvent || !rollEvent.result) return;
        const uniqueId = String(rollEvent.rollId || `${rollEvent.title}|${rollEvent.result}`);
        if (shownRollIds.has(uniqueId)) return;
        shownRollIds.add(uniqueId);
        if (shownRollIds.size > 30) {
          const firstKey = shownRollIds.values().next().value;
          shownRollIds.delete(firstKey);
        }

        const resultColor = rollEvent.isCrit ? "#f59e0b" : rollEvent.isFumble ? "#ef4444" : skin.titleColor;

        activeRollHtml = `
          <div class="obs-roll-note mb-3 px-4 py-2.5 ${skin.rollCardClass} flex items-center justify-between gap-3">
            <div class="min-w-0">
              <div class="text-xs ${skin.titleFont} uppercase tracking-wide truncate" style="color:${skin.titleColor}">${rollEvent.title}</div>
              <div class="text-[11px] ${skin.monoFont} truncate" style="color:${skin.subTextColor}">${rollEvent.detail}</div>
            </div>
            <div class="text-3xl ${skin.titleFont} font-bold pl-3 border-l border-dashed border-current/30"
                 style="color: ${resultColor};">
              ${rollEvent.result}
            </div>
          </div>
        `;

        const slot = document.getElementById("obs-live-roll-slot");
        if (slot) slot.innerHTML = activeRollHtml;

        clearTimeout(lastRollTimeout);
        lastRollTimeout = setTimeout(() => {
          activeRollHtml = "";
          const s = document.getElementById("obs-live-roll-slot");
          if (s) s.innerHTML = "";
        }, 4800);
      }
      function getEquippedObsWeapons(ag) {
        const inv = Array.isArray(ag?.inventory) ? ag.inventory : [];
        return inv
          .filter(it => it && it.type === "Arma" && it.equipped)
          .map(weapon => {
            const usesAmmo = !weapon.noAmmo && (
              weapon.skill === "Pontaria"
              || /pistola|revólver|revolver|fuzil|submetralhadora|espingarda|arco|besta|balestra|bazuca|lança-chamas|metralhadora/i.test(weapon.name || "")
            );
            const max = typeof weapon.ammoMax === "number" && weapon.ammoMax > 0 ? weapon.ammoMax : 12;
            const current = typeof weapon.ammoCurrent === "number" ? weapon.ammoCurrent : max;
            return { name: weapon.name || "Arma", usesAmmo, current, max };
          });
      }
      function renderObsOverlay(rollEvent = null, force = false) {
        if (!currentObsAgent) return;

        const ag = currentObsAgent;
        const cfg = currentObsCfg || {};
        const skin = getActiveSkin(cfg);
        const vitals = computeObsAgentVitals(ag);

        const curPv = ag.currentPv ?? vitals.maxPv;
        const curPe = ag.currentPe ?? vitals.maxPe;
        const curSan = ag.currentSan ?? vitals.maxSan;

        const stateHash = JSON.stringify({
          weapons: getEquippedObsWeapons(ag),
          sk: skin.id,
          n: ag.name, x: ag.nex, a: ag.affinity,
          pv: curPv, mpv: vitals.maxPv,
          pe: curPe, mpe: vitals.maxPe,
          san: curSan, msan: vitals.maxSan,
          img: cfg.avatarNormal, imgh: cfg.avatarHurt,
          imgi: cfg.avatarInsane, imgd: cfg.avatarDying,
          sb: cfg.showBars, sn: cfg.showName, sx: cfg.showNex
        });

        if (!force && stateHash === lastRenderedHash) {
          if (rollEvent) triggerObsRollPopup(rollEvent, skin);
          return;
        }
        lastRenderedHash = stateHash;

        const pvPct = Math.min(100, Math.max(0, Math.round((curPv / vitals.maxPv) * 100)));
        const pePct = Math.min(100, Math.max(0, Math.round((curPe / vitals.maxPe) * 100)));
        const sanPct = Math.min(100, Math.max(0, Math.round((curSan / vitals.maxSan) * 100)));

        const isDying = curPv <= 0;
        const isHurt = curPv > 0 && curPv <= Math.floor(vitals.maxPv / 2);
        const isInsane = curSan <= Math.floor(vitals.maxSan / 2);

        let chosenUrl = cfg.avatarNormal || "";
        let autoFilterClass = "";
        let statusStamp = "";

        if (isDying) {
          chosenUrl = cfg.avatarDying || cfg.avatarHurt || cfg.avatarNormal || "";
          autoFilterClass = cfg.avatarDying ? "" : "obs-dying-filter";
          statusStamp = "MORRENDO";
        } else if (isInsane) {
          chosenUrl = cfg.avatarInsane || cfg.avatarNormal || "";
          autoFilterClass = cfg.avatarInsane ? "" : "obs-mad-filter";
          statusStamp = curSan <= 0 ? "ENLOUQUECENDO" : "PERTURBADO";
        } else if (isHurt) {
          chosenUrl = cfg.avatarHurt || cfg.avatarNormal || "";
          autoFilterClass = cfg.avatarHurt ? "" : "obs-hurt-filter";
          statusStamp = "MACHUCADO";
        }

        const initials = (ag.name || "AG")
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map(w => w[0]?.toUpperCase() || "")
          .join("") || "AG";

        const showBars = !hideBarsParam && cfg.showBars !== false;
        const showName = cfg.showName !== false;
        const showNex = cfg.showNex !== false;
        const equippedWeapons = getEquippedObsWeapons(ag);
        const weaponTileSizeClass = layoutMode === "webcam" ? "w-32 h-32" : "w-[270px] h-[270px]";
        const weaponTileOffsetClass = layoutMode === "webcam" ? "mt-4" : "mt-8";
        const weaponIconSizeClass = layoutMode === "webcam" ? "text-2xl" : "text-5xl";
        const weaponNameSizeClass = layoutMode === "webcam" ? "text-[11px]" : "text-lg";
        const weaponCardsHtml = equippedWeapons.length ? `
          <div class="flex shrink-0 flex-col gap-2 ${weaponTileOffsetClass}">
            ${equippedWeapons.map(weapon => {
              const ammoLow = weapon.usesAmmo && weapon.current <= Math.ceil(weapon.max * 0.25);
              const icon = weapon.usesAmmo ? "🔫" : "⚔️";
              return `
                <div class="${weaponTileSizeClass} shrink-0 relative flex flex-col items-center justify-center gap-2 p-3 text-center ${skin.cardClass}">
                  ${skin.hasTape ? `<div class="obs-tape-strip absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 w-20 h-4 -rotate-2"></div>` : ""}
                  <span class="${weaponIconSizeClass} leading-none">${icon}</span>
                  <span class="w-full ${weaponNameSizeClass} font-bold leading-tight break-words line-clamp-2" style="color:${skin.titleColor}" title="${weapon.name}">
                    ${weapon.name}
                  </span>
                  <span class="${layoutMode === "webcam" ? "text-[10px]" : "text-sm"} font-mono font-bold" style="color:${weapon.usesAmmo && weapon.current === 0 ? '#ef4444' : ammoLow ? '#f59e0b' : skin.subTextColor}">
                    ${weapon.usesAmmo ? `${weapon.current}/${weapon.max}` : "EQUIPADA"}
                  </span>
                </div>
              `;
            }).join("")}
          </div>
        ` : "";
        if (layoutMode === "webcam") {
          const photoHtml = chosenUrl
            ? `<img src="${chosenUrl}" alt="${ag.name}" class="w-full h-full object-cover object-top transition-all duration-300 ${autoFilterClass}" />`
            : `<div class="w-full h-full flex flex-col items-center justify-center ${skin.titleFont} text-3xl ${autoFilterClass}" style="color:${skin.subTextColor}">
                 <span>${initials}</span>
               </div>`;

          stage.innerHTML = `
            <div class="w-[680px] max-w-full flex flex-col items-stretch">
              <div class="flex items-start gap-3">
                <div class="relative w-[520px] max-w-[calc(100%-140px)]">
                  <div id="obs-live-roll-slot" class="absolute bottom-full left-0 right-0 z-20">${activeRollHtml}</div>
                  <div class="relative flex items-center gap-4 p-3.5 pt-4 ${skin.cardClass}">
                  ${skin.hasTape ? `
                    <div class="obs-tape-strip absolute -top-2.5 left-10 w-20 h-4 -rotate-2"></div>
                    <div class="obs-tape-strip absolute -top-2 right-12 w-16 h-4 rotate-1"></div>
                  ` : ""}

                  <div class="${skin.photoFrameClass} w-28 h-32 shrink-0 relative">
                    <div class="w-full h-full overflow-hidden rounded-[inherit]">
                      ${photoHtml}
                    </div>
                    ${showNex && skin.nexInsidePolaroid ? `
                      <span class="absolute bottom-1 left-2 right-2 text-center text-[10px] ${skin.monoFont} font-bold tracking-wider" style="color:${skin.subTextColor}">
                        NEX ${ag.nex || 5}%
                      </span>` : ""}
                  </div>

                  <div class="flex-1 min-w-0 flex flex-col justify-between gap-2">
                    <div class="flex items-start justify-between gap-2 ${skin.dividerClass} pb-1.5">
                      <div class="min-w-0 flex-1">
                        ${showName ? `
                          <h1 class="text-[28px] ${skin.titleFont} font-extrabold truncate leading-none tracking-tight" style="color:${skin.titleColor}">
                            ${ag.name || "Agente"}
                          </h1>` : ""}
                        ${showNex && !skin.nexInsidePolaroid ? `
                          <span class="text-[11px] ${skin.monoFont} font-bold tracking-wider block mt-1" style="color:${skin.subTextColor}">
                            ${ag.charClass ? `${ag.charClass} • ` : ""}NEX ${ag.nex || 5}%
                          </span>` : ""}
                      </div>

                      ${statusStamp ? `
                        <span class="px-2 py-0.5 text-[10px] ${skin.titleFont} font-bold uppercase tracking-wider shrink-0 self-center ${skin.stampBoxClass}">
                          ${statusStamp}
                        </span>` : ""}
                    </div>

                    ${showBars ? `
                      <div class="space-y-2 ${skin.monoFont}">
                        <div>
                          <div class="flex items-baseline justify-between text-xs mb-0.5">
                            <span class="font-bold tracking-wider" style="color:${skin.pvLabelColor}">VITALIDADE (PV)</span>
                            <span class="text-base font-bold" style="color:${skin.titleColor}">
                              ${curPv}<span class="text-xs font-normal" style="color:${skin.subTextColor}">/${vitals.maxPv}</span>
                            </span>
                          </div>
                          <div class="w-full h-3 ${skin.barTrackClass}">
                            <div class="h-full transition-all duration-300" style="width:${pvPct}%; background-color:${skin.pvBar};"></div>
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                          <div>
                            <div class="flex items-baseline justify-between text-xs mb-0.5">
                              <span class="font-bold" style="color:${skin.peLabelColor}">ESFORÇO</span>
                              <span class="text-sm font-bold" style="color:${skin.titleColor}">
                                ${curPe}<span class="text-[11px] font-normal" style="color:${skin.subTextColor}">/${vitals.maxPe}</span>
                              </span>
                            </div>
                            <div class="w-full h-2.5 ${skin.barTrackClass}">
                              <div class="h-full transition-all duration-300" style="width:${pePct}%; background-color:${skin.peBar};"></div>
                            </div>
                          </div>

                          <div>
                            <div class="flex items-baseline justify-between text-xs mb-0.5">
                              <span class="font-bold" style="color:${skin.sanLabelColor}">SANIDADE</span>
                              <span class="text-sm font-bold" style="color:${skin.titleColor}">
                                ${curSan}<span class="text-[11px] font-normal" style="color:${skin.subTextColor}">/${vitals.maxSan}</span>
                              </span>
                            </div>
                            <div class="w-full h-2.5 ${skin.barTrackClass}">
                              <div class="h-full transition-all duration-300" style="width:${sanPct}%; background-color:${skin.sanBar};"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ` : ""}
                  </div>
                </div>
                </div>
                ${weaponCardsHtml}
              </div>
            </div>
          `;

          if (rollEvent) triggerObsRollPopup(rollEvent, skin);
          return;
        }

        // Layout Vertical (Card)
        const cardPhoto = chosenUrl
          ? `<img src="${chosenUrl}" alt="${ag.name}" class="w-full h-full object-cover object-top transition-all duration-300 ${autoFilterClass}" />`
          : `<div class="w-full h-full flex items-center justify-center ${skin.titleFont} text-5xl ${autoFilterClass}" style="color:${skin.subTextColor}">
               ${initials}
             </div>`;

        stage.innerHTML = `
          <div class="w-[660px] max-w-full flex flex-col items-stretch">
            <div class="flex items-start gap-3">
              <div class="relative w-[360px] max-w-[calc(100%-282px)]">
                <div id="obs-live-roll-slot" class="absolute bottom-full left-0 right-0 z-20">${activeRollHtml}</div>
                <div class="relative p-4 pt-5 ${skin.cardClass} space-y-3">
                  ${skin.hasTape ? `<div class="obs-tape-strip absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 -rotate-1"></div>` : ""}

                  <div class="${skin.photoFrameClass} !transform-none !p-2 !pb-3 relative">
                    <div class="w-full h-[270px] overflow-hidden">
                      ${cardPhoto}
                    </div>

                    ${statusStamp ? `
                      <div class="absolute top-4 right-4 px-2.5 py-1 text-xs ${skin.titleFont} font-bold uppercase tracking-wider shadow ${skin.stampBoxClass}">
                        ${statusStamp}
                      </div>` : ""}

                    <div class="mt-2.5 flex items-baseline justify-between gap-2 px-1">
                      ${showName ? `
                        <h1 class="text-[28px] ${skin.titleFont} font-extrabold truncate leading-none tracking-tight" style="color:${skin.titleColor}">
                          ${ag.name || "Agente"}
                        </h1>` : `<span></span>`}
                      ${showNex ? `
                        <span class="text-xs ${skin.monoFont} font-bold shrink-0" style="color:${skin.subTextColor}">
                          NEX ${ag.nex || 5}%
                        </span>` : ""}
                    </div>
                  </div>

                  ${showBars ? `
                    <div class="space-y-2 ${skin.monoFont} pt-0.5">
                      <div>
                        <div class="flex items-baseline justify-between text-xs mb-0.5">
                          <span class="font-bold" style="color:${skin.pvLabelColor}">PV</span>
                          <span class="text-base font-bold" style="color:${skin.titleColor}">${curPv}<span class="text-xs font-normal" style="color:${skin.subTextColor}">/${vitals.maxPv}</span></span>
                        </div>
                        <div class="w-full h-3 ${skin.barTrackClass}">
                          <div class="h-full transition-all duration-300" style="width:${pvPct}%; background-color:${skin.pvBar};"></div>
                        </div>
                      </div>

                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <div class="flex items-baseline justify-between text-xs mb-0.5">
                            <span class="font-bold" style="color:${skin.peLabelColor}">PE</span>
                            <span class="text-sm font-bold" style="color:${skin.titleColor}">${curPe}<span class="text-[11px] font-normal" style="color:${skin.subTextColor}">/${vitals.maxPe}</span></span>
                          </div>
                          <div class="w-full h-2.5 ${skin.barTrackClass}">
                            <div class="h-full transition-all duration-300" style="width:${pePct}%; background-color:${skin.peBar};"></div>
                          </div>
                        </div>

                        <div>
                          <div class="flex items-baseline justify-between text-xs mb-0.5">
                            <span class="font-bold" style="color:${skin.sanLabelColor}">SAN</span>
                            <span class="text-sm font-bold" style="color:${skin.titleColor}">${curSan}<span class="text-[11px] font-normal" style="color:${skin.subTextColor}">/${vitals.maxSan}</span></span>
                          </div>
                          <div class="w-full h-2.5 ${skin.barTrackClass}">
                            <div class="h-full transition-all duration-300" style="width:${sanPct}%; background-color:${skin.sanBar};"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ` : ""}
                </div>
              </div>
              ${weaponCardsHtml}
            </div>
          </div>
        `;

        if (rollEvent) triggerObsRollPopup(rollEvent, skin);
      }

      function updateObsAgent(agent, updatedAt, rollEvent = null) {
        if (!agent || (targetAgentId && agent.id !== targetAgentId)) return false;

        const timestamp = Number(updatedAt);
        const incomingUpdatedAt = Number.isFinite(timestamp) ? timestamp : Number(agent.updatedAt) || 0;
        if (incomingUpdatedAt < lastObsAgentUpdatedAt) {
          renderObsOverlay(rollEvent);
          return false;
        }

        if (currentObsAgent && agent.id === currentObsAgent.id && !Array.isArray(agent.inventory) && Array.isArray(currentObsAgent.inventory)) {
          agent = { ...agent, inventory: currentObsAgent.inventory };
        }

        currentObsAgent = agent;
        lastObsAgentUpdatedAt = incomingUpdatedAt;
        renderObsOverlay(rollEvent);
        return true;
      }

      function applyCloudPayload(data) {
        if (!data || !data.agent) return;
        if (data.obsCfg) {
          currentObsCfg = { ...currentObsCfg, ...data.obsCfg };
        }
        updateObsAgent(data.agent, data.agent.updatedAt || data.updatedAt, data.rollEvent || null);
      }

      function syncFromLocalStorage() {
        try {
          const raw = localStorage.getItem("op_agents_roster_v1");
          if (!raw) return false;
          const roster = JSON.parse(raw);
          const found = targetAgentId
            ? roster.agents.find(a => a.id === targetAgentId)
            : (roster.agents.find(a => a.id === roster.activeId) || roster.agents[0]);
          if (found) {
            currentObsCfg = { ...currentObsCfg, ...(getObsSettingsMap()[found.id] || {}) };
            return updateObsAgent(found, found.updatedAt);
          }
        } catch (e) {}
        return false;
      }

      if (obsChannel) {
        obsChannel.onmessage = (ev) => {
          const data = ev.data;
          if (!data || data.type !== "OBS_PORTRAIT_UPDATE") return;
          if (targetAgentId && data.agent?.id !== targetAgentId) return;
          currentObsCfg = { ...currentObsCfg, ...(data.obsCfg || {}) };
          updateObsAgent(data.agent, data.agent?.updatedAt || data.ts, data.rollEvent || null);
        };
      }

      async function bootstrapObsRealtime() {
        syncFromLocalStorage();
        if (currentObsAgent) {
          renderObsOverlay(null, true);
        } else {
          showObsDiagnostic("Conectando ao banco de dados da Ordo Realitas...");
        }

        const user = await authReadyPromise;
        if (!user) {
          showObsDiagnostic("Erro de autenticação: ative o provedor 'Anônimo' em Authentication > Sign-in method no Firebase Console.");
          return;
        }

        const docIdToWatch = targetAgentId || "latest_active_agent";
        const overlayDocRef = doc(obsDb, "sessions", "OBS_LIVE_PORTRAIT", "agents", docIdToWatch);

        onSnapshot(
          overlayDocRef,
          (liveSnap) => {
            if (liveSnap.exists()) {
              applyCloudPayload(liveSnap.data());
            } else {
              showObsDiagnostic("Abra a ficha no navegador e altere algum valor (ou clique em OBS Portrait) para enviar os dados.");
            }
          },
          (err) => {
            showObsDiagnostic(`Erro Firestore (${err.code}): verifique as Regras de Segurança do banco.`);
          }
        );

        if (targetRoomCode && targetAgentId) {
          onSnapshot(doc(obsDb, "sessions", targetRoomCode, "agents", targetAgentId), (roomSnap) => {
            if (roomSnap.exists()) {
              const roomAgent = roomSnap.data();
              updateObsAgent(roomAgent, roomAgent.updatedAt || roomAgent.syncedAt);
            }
          });
        }

        setInterval(async () => {
          try {
            const snap = await getDocFromServer(overlayDocRef);
            if (snap.exists()) applyCloudPayload(snap.data());
          } catch (e) {
            try {
              const fallbackSnap = await getDoc(overlayDocRef);
              if (fallbackSnap.exists()) applyCloudPayload(fallbackSnap.data());
            } catch (_) {}
          }
        }, 1200);
      }

      bootstrapObsRealtime();
    }

    // ==================== 2. MODO NORMAL DA FICHA: SELETOR DE SKINS & ENVIO ====================
    if (!isObsMode) {
      let lastRosterJson = localStorage.getItem("op_agents_roster_v1") || "";
      let lastCfgJson = localStorage.getItem(OBS_CFG_KEY) || "";
      let lastRollDispatchTs = 0;

      setInterval(() => {
        const curRoster = localStorage.getItem("op_agents_roster_v1") || "";
        const curCfg = localStorage.getItem(OBS_CFG_KEY) || "";
        if (curRoster !== lastRosterJson || curCfg !== lastCfgJson) {
          lastRosterJson = curRoster;
          lastCfgJson = curCfg;
          broadcastObsSnapshot(null, true);
        }
      }, 400);

      function attachObsRollListener() {
        const toastBox = document.getElementById("toast-container");
        if (!toastBox || toastBox.dataset.obsBound === "1") return;
        toastBox.dataset.obsBound = "1";

        const obsRollWatcher = new MutationObserver((mutations) => {
          for (const m of mutations) {
            for (const node of m.addedNodes) {
              if (node.nodeType === 1) {
                const title = node.querySelector("span.text-xs.font-semibold")?.textContent?.trim() || "Teste";
                const detail = node.querySelector("p.text-xs.font-mono")?.textContent?.trim() || "";
                const result = node.querySelector("div.text-2xl.font-mono")?.textContent?.trim() || "";
                const isCrit = node.classList.contains("border-amber-400");
                const isFumble = node.classList.contains("border-rose-500");
                if (result) {
                  const now = Date.now();
                  if (now - lastRollDispatchTs < 900) return;
                  lastRollDispatchTs = now;
                  const rollId = `${now}_${Math.random().toString(36).slice(2, 7)}`;
                  broadcastObsSnapshot({ title, detail, result, isCrit, isFumble, rollId }, true);
                  return;
                }
              }
            }
          }
        });
        obsRollWatcher.observe(toastBox, { childList: true });
      }

      function injectObsPortraitButtonAndModal() {
        const topBarRight = document.querySelector("body > div:first-child .max-w-7xl > div:last-child");
        if (topBarRight && !document.getElementById("btn-open-obs-modal")) {
          const btn = document.createElement("button");
          btn.id = "btn-open-obs-modal";
          btn.type = "button";
          btn.className = "px-2.5 py-1 rounded-md bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-200 font-semibold transition flex items-center gap-1.5";
          btn.innerHTML = `<span>🎥</span> <span class="hidden md:inline">OBS Portrait</span>`;
          topBarRight.prepend(btn);
        }

        if (!document.getElementById("modal-obs-portrait")) {
          const modal = document.createElement("div");
          modal.id = "modal-obs-portrait";
          modal.className = "fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden items-center justify-center p-4";
          modal.innerHTML = `
            <div class="bg-surface border border-borderSubtle rounded-2xl max-w-3xl w-full p-6 flex flex-col max-h-[90vh] space-y-4 shadow-2xl">
              <div class="flex items-center justify-between border-b border-borderSubtle pb-3">
                <div class="flex items-center gap-2.5">
                  <span class="text-xl">🎥</span>
                  <div>
                    <h3 class="text-base font-bold text-white">OBS Studio — Portrait & Skins de Stream</h3>
                    <p id="obs-cloud-status-badge" class="text-[11px] font-mono text-zinc-400">${obsSyncStatusText}</p>
                  </div>
                </div>
                <button type="button" id="btn-close-obs-modal" class="text-zinc-400 hover:text-white text-lg px-2">✕</button>
              </div>
              <div id="obs-modal-content" class="overflow-y-auto flex-1 pr-1 space-y-4"></div>
            </div>
          `;
          document.body.appendChild(modal);
        }
      }

      function buildObsUrl(agentId, layout = "webcam", skinId = "dossier") {
        const baseUrl = window.location.href.split("?")[0].split("#")[0];
        let sessionMeta = {};
        try {
          sessionMeta = JSON.parse(localStorage.getItem("op_multiplayer_session_v1") || "{}");
        } catch (e) {}

        const ag = getActiveRosterAgent();
        const cfg = ag ? { ...(getObsSettingsMap()[ag.id] || {}), skin: skinId } : { skin: skinId };
        const standalonePayload = ag ? encodeStandalonePayload(ag, cfg, computeObsAgentVitals) : "";

        const params = new URLSearchParams();
        params.set("obs", "1");
        params.set("layout", layout);
        params.set("skin", skinId);
        if (agentId) params.set("agent", agentId);
        if (sessionMeta.roomCode) params.set("room", sessionMeta.roomCode);
        if (standalonePayload) params.set("d", standalonePayload);
        return `${baseUrl}?${params.toString()}`;
      }

      let selectedObsLayout = "webcam";

      function renderObsConfigModal() {
        const container = document.getElementById("obs-modal-content");
        if (!container) return;

        const ag = getActiveRosterAgent();
        if (!ag) {
          container.innerHTML = `<p class="text-xs text-zinc-400">Selecione ou crie um agente primeiro.</p>`;
          return;
        }

        const cfg = getObsSettingsMap()[ag.id] || {};
        const activeSkinId = cfg.skin || "dossier";
        broadcastObsSnapshot(null, true);

        const obsUrl = buildObsUrl(ag.id, selectedObsLayout, activeSkinId);
        const recSize = selectedObsLayout === "webcam" ? "Largura: 720 × Altura: 255" : "Largura: 700 × Altura: 500";

        const skinCardsHtml = Object.values(OBS_SKINS).map(sk => {
          const isSelected = sk.id === activeSkinId;
          return `
            <button type="button" data-obs-skin="${sk.id}"
              class="p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${isSelected ? "border-purple-400 bg-purple-500/15 text-white shadow-md" : "border-borderSubtle bg-surface text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"}">
              <div class="flex items-center justify-between gap-1">
                <span class="font-bold text-xs">${sk.name}</span>
                ${isSelected ? `<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/30 accent-text">Ativa</span>` : ""}
              </div>
              <p class="text-[11px] text-zinc-400 leading-snug">${sk.desc}</p>
            </button>
          `;
        }).join("");

        container.innerHTML = `
          <div class="bg-void border border-purple-500/35 rounded-2xl p-4 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold accent-text uppercase tracking-wider">1. Escolha a Skin Visual do Portrait</span>
              <span class="text-[11px] font-mono text-zinc-400">Troca em tempo real no OBS sem precisar reconfigurar</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${skinCardsHtml}
            </div>
          </div>

          <div class="bg-void border border-amber-500/35 rounded-2xl p-4 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold text-amber-300 uppercase tracking-wider">2. Formato & Link do OBS</span>
              <span class="text-[11px] font-mono text-zinc-400">Agente: <strong class="text-emerald-400">${ag.name} (NEX ${ag.nex || 5}%)</strong></span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button type="button" data-obs-layout="webcam"
                class="p-2.5 rounded-xl border text-left transition ${selectedObsLayout === "webcam" ? "border-amber-400 bg-amber-500/15 text-white" : "border-borderSubtle bg-surface text-zinc-400 hover:text-zinc-200"}">
                <div class="font-bold flex items-center justify-between">
                  <span>🗂 Horizontal (Webcam / Canto)</span>
                  <span class="text-[10px] font-mono text-amber-300">720×255</span>
                </div>
                <p class="text-[11px] text-zinc-400 mt-0.5">Retrato e barras com a arma equipada em um quadrado separado.</p>
              </button>

              <button type="button" data-obs-layout="card"
                class="p-2.5 rounded-xl border text-left transition ${selectedObsLayout === "card" ? "border-amber-400 bg-amber-500/15 text-white" : "border-borderSubtle bg-surface text-zinc-400 hover:text-zinc-200"}">
                <div class="font-bold flex items-center justify-between">
                  <span>📎 Vertical (Card Completo)</span>
                  <span class="text-[10px] font-mono text-amber-300">700×500</span>
                </div>
                <p class="text-[11px] text-zinc-400 mt-0.5">Retrato vertical com status e arma equipada ao lado.</p>
              </button>
            </div>

            <div class="flex gap-2">
              <input type="text" id="obs-generated-url" readonly value="${obsUrl}"
                class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-xs font-mono text-zinc-200 outline-none" />
              <button type="button" id="btn-copy-obs-url" class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition shrink-0">
                📋 Copiar Link OBS
              </button>
              <a href="${obsUrl}" target="_blank" class="px-3 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs text-zinc-200 font-medium transition shrink-0">
                ↗ Testar
              </a>
            </div>
            <p class="text-[11px] text-zinc-400">
              No OBS Studio: <strong>Fontes (+) → Navegador</strong> → Cole o link → Dimensões: <code class="text-amber-300 font-mono">${recSize}</code>.
            </p>
          </div>

          <div class="bg-void border border-borderSubtle rounded-2xl p-4 space-y-3">
            <span class="block text-xs font-bold text-white uppercase tracking-wider">3. Expressões & Fotografia do Agente</span>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label class="block text-zinc-400 mb-1">Foto Padrão (Normal)</label>
                <div class="flex gap-1.5">
                  <input type="text" id="obs-input-normal" value="${cfg.avatarNormal || ""}" placeholder="https://... ou clique na pasta →"
                    class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-white outline-none" />
                  <label class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 cursor-pointer shrink-0">
                    📁 <input type="file" accept="image/*" data-obs-file="avatarNormal" class="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-rose-300 mb-1">Foto Machucado (≤ 50% PV) <span class="text-zinc-500">(opcional)</span></label>
                <div class="flex gap-1.5">
                  <input type="text" id="obs-input-hurt" value="${cfg.avatarHurt || ""}" placeholder="Filtro automático se vazio"
                    class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-white outline-none" />
                  <label class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 cursor-pointer shrink-0">
                    📁 <input type="file" accept="image/*" data-obs-file="avatarHurt" class="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-sky-300 mb-1">Foto Perturbado / Enlouquecendo <span class="text-zinc-500">(opcional)</span></label>
                <div class="flex gap-1.5">
                  <input type="text" id="obs-input-insane" value="${cfg.avatarInsane || ""}" placeholder="Filtro automático se vazio"
                    class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-white outline-none" />
                  <label class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 cursor-pointer shrink-0">
                    📁 <input type="file" accept="image/*" data-obs-file="avatarInsane" class="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1">Foto Morrendo (0 PV) <span class="text-zinc-500">(opcional)</span></label>
                <div class="flex gap-1.5">
                  <input type="text" id="obs-input-dying" value="${cfg.avatarDying || ""}" placeholder="P&B automático se vazio"
                    class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-white outline-none" />
                  <label class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 cursor-pointer shrink-0">
                    📁 <input type="file" accept="image/*" data-obs-file="avatarDying" class="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-5 pt-2 border-t border-borderSubtle text-xs text-zinc-300">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="obs-chk-bars" ${cfg.showBars !== false ? "checked" : ""} />
                <span>Mostrar Barras & Números (PV / PE / SAN)</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="obs-chk-name" ${cfg.showName !== false ? "checked" : ""} />
                <span>Mostrar Nome do Personagem</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="obs-chk-nex" ${cfg.showNex !== false ? "checked" : ""} />
                <span>Mostrar NEX</span>
              </label>
            </div>

            <div class="flex justify-end pt-1">
              <button type="button" id="btn-save-obs-cfg" class="px-5 py-2 rounded-xl accent-bg hover:bg-purple-500 text-white text-xs font-semibold transition">
                Salvar & Atualizar Link
              </button>
            </div>
          </div>
        `;
      }

      document.addEventListener("click", (e) => {
        const skinBtn = e.target.closest("[data-obs-skin]");
        if (skinBtn) {
          const ag = getActiveRosterAgent();
          if (ag) {
            saveObsSettingsForAgent(ag.id, { skin: skinBtn.getAttribute("data-obs-skin") });
            renderObsConfigModal();
          }
          return;
        }

        const layoutBtn = e.target.closest("[data-obs-layout]");
        if (layoutBtn) {
          selectedObsLayout = layoutBtn.getAttribute("data-obs-layout");
          renderObsConfigModal();
          return;
        }

        const btn = e.target.closest("button");
        if (!btn) return;

        if (btn.id === "btn-open-obs-modal") {
          const modal = document.getElementById("modal-obs-portrait");
          if (modal) {
            modal.classList.remove("hidden");
            modal.classList.add("flex");
            renderObsConfigModal();
          }
        } else if (btn.id === "btn-close-obs-modal") {
          const modal = document.getElementById("modal-obs-portrait");
          if (modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
          }
        } else if (btn.id === "btn-copy-obs-url") {
          const input = document.getElementById("obs-generated-url");
          if (input) {
            input.select();
            document.execCommand("copy");
            btn.textContent = "✓ Link Copiado!";
            setTimeout(() => { btn.textContent = "📋 Copiar Link OBS"; }, 2000);
          }
        } else if (btn.id === "btn-save-obs-cfg") {
          const ag = getActiveRosterAgent();
          if (!ag) return;
          saveObsSettingsForAgent(ag.id, {
            avatarNormal: document.getElementById("obs-input-normal")?.value.trim() || "",
            avatarHurt: document.getElementById("obs-input-hurt")?.value.trim() || "",
            avatarInsane: document.getElementById("obs-input-insane")?.value.trim() || "",
            avatarDying: document.getElementById("obs-input-dying")?.value.trim() || "",
            showBars: document.getElementById("obs-chk-bars")?.checked !== false,
            showName: document.getElementById("obs-chk-name")?.checked !== false,
            showNex: document.getElementById("obs-chk-nex")?.checked !== false
          });
          renderObsConfigModal();
          const savedBtn = document.getElementById("btn-save-obs-cfg");
          if (savedBtn) {
            savedBtn.textContent = "✓ Salvo & Link Atualizado!";
            setTimeout(() => { savedBtn.textContent = "Salvar & Atualizar Link"; }, 2000);
          }
        }
      });

      document.addEventListener("change", (e) => {
        const fileInput = e.target.closest("input[data-obs-file]");
        if (!fileInput || !fileInput.files?.[0]) return;
        const fieldKey = fileInput.getAttribute("data-obs-file");
        const reader = new FileReader();
        reader.onload = async (ev) => {
          const compressed = await compressImageDataUrl(ev.target.result, 280, 0.72);
          const textInputId = {
            avatarNormal: "obs-input-normal",
            avatarHurt: "obs-input-hurt",
            avatarInsane: "obs-input-insane",
            avatarDying: "obs-input-dying"
          }[fieldKey];
          const textInput = document.getElementById(textInputId);
          if (textInput) textInput.value = compressed;
        };
        reader.readAsDataURL(fileInput.files[0]);
      });

      function bootObsConfigModule() {
        injectObsPortraitButtonAndModal();
        attachObsRollListener();
        broadcastObsSnapshot(null, true);
        setInterval(() => {
          if (!document.getElementById("btn-open-obs-modal")) {
            injectObsPortraitButtonAndModal();
          }
        }, 1500);
      }

      if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", bootObsConfigModule);
      } else {
        bootObsConfigModule();
      }
    }
})());
