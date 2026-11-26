    // ==================== MULTI-AGENT ROSTER & STATE MANAGEMENT ====================
    const ROSTER_STORAGE_KEY = 'op_agents_roster_v1';
    const LEGACY_STORAGE_KEY = 'ordem_paranormal_sheet_v3';

    function generateAgentId() {
      return 'ag_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
    }

    function getDefaultState(overrides = {}) {
      const skillsState = {};
      OFFICIAL_SKILLS.forEach(s => {
        skillsState[s.name] = { attr: s.attr, rank: 0, other: 0 };
      });

      const base = {
        id: generateAgentId(),
        updatedAt: Date.now(),
        name: 'Novo Agente',
        avatar: '',
        player: '',
        origin: 'Personalizada',
        charClass: 'Combatente',
        path: 'Aniquilador',
        rank: 'Recruta',
        nex: 5,
        pp: 0,
        affinity: 'Nenhuma',
        attributes: { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 },
        combatenteAttackSkill: 'Luta',
        combatenteDefenseSkill: 'Fortitude',
        peritoSkills: [],
        currentPv: 21,
        currentPe: 3,
        currentSan: 12,
        bonusPv: 0,
        bonusPe: 0,
        bonusSan: 0,
        speed: 9,
        defenseOther: 0,
        rd: '',
        proficiencies: 'Armas Simples, Armas Táticas, Proteções Leves',
        notes: '',
        clues: '',
        skills: skillsState,
        abilities: [],
        rituals: [],
        inventory: [
          {
            id: 101,
            name: 'Faca',
            type: 'Arma',
            cat: '0',
            spaces: 1,
            skill: 'Luta',
            damage: '1d4',
            crit: '19/x2',
            equipped: true,
            desc: 'Arma simples leve, ágil, arremesso (curto). Corte.'
          }
        ]
      };

      return { ...base, ...overrides };
    }

    function createPresetObject(presetType) {
      if (presetType === 'combatente') {
        const ag = getDefaultState({
          name: 'Kaelen Vance',
          player: 'Agente',
          origin: 'Militar',
          charClass: 'Combatente',
          path: 'Tropa de Choque',
          rank: 'Operador',
          nex: 15,
          pp: 25,
          attributes: { AGI: 2, FOR: 3, INT: 1, PRE: 1, VIG: 2 },
          combatenteAttackSkill: 'Luta',
          combatenteDefenseSkill: 'Fortitude',
          currentPv: 39,
          currentPe: 9,
          currentSan: 18,
          inventory: [
            { id: 1, name: 'Fuzil de Assalto', type: 'Arma', cat: 'II', spaces: 2, skill: 'Pontaria', damage: '2d10', crit: '19/x3', equipped: true, desc: 'Arma tática duas mãos, automática, alcance médio.' },
            { id: 2, name: 'Machado', type: 'Arma', cat: 'I', spaces: 1, skill: 'Luta', damage: '1d8', crit: 'x3', equipped: true, desc: 'Arma tática uma mão. Corte.' },
            { id: 3, name: 'Proteção Leve', type: 'Proteção', cat: 'I', spaces: 2, defense: 5, equipped: true, desc: 'Colete de kevlar leve (+5 Defesa).' },
            { id: 4, name: 'Balas Longas (Pacote)', type: 'Munição/Explosivo', cat: 'I', spaces: 1, desc: 'Munição para fuzil.' }
          ],
          abilities: [
            { id: 11, name: 'Golpe Pesado', source: 'Poder de Combatente', cost: 'Passivo', element: 'Nenhum', affinity: false, desc: 'O dano de suas armas corpo a corpo aumenta em mais um dado do mesmo tipo.' }
          ]
        });
        ag.skills['Pontaria'].rank = 5;
        ag.skills['Tática'].rank = 5;
        ag.skills['Luta'].rank = 5;
        ag.skills['Fortitude'].rank = 5;
        ag.skills['Iniciativa'].rank = 5;
        ag.skills['Atletismo'].rank = 5;
        return ag;
      }

      if (presetType === 'especialista') {
        const ag = getDefaultState({
          name: 'Helena Duarte',
          player: 'Agente',
          origin: 'Investigador',
          charClass: 'Especialista',
          path: 'Atirador de Elite',
          rank: 'Operador',
          nex: 20,
          pp: 30,
          attributes: { AGI: 3, FOR: 1, INT: 3, PRE: 2, VIG: 1 },
          peritoSkills: ['Investigação', 'Pontaria'],
          proficiencies: 'Armas Simples, Armas de Fogo (Balas Longas), Proteções Leves',
          currentPv: 28,
          currentPe: 20,
          currentSan: 28,
          inventory: [
            { id: 1, name: 'Fuzil de Caça', type: 'Arma', cat: 'I', spaces: 2, skill: 'Pontaria', damage: '2d8', crit: '19/x3', equipped: true, desc: 'Soma Intelecto no dano (Mira de Elite).' },
            { id: 2, name: 'Pistola', type: 'Arma', cat: 'I', spaces: 1, skill: 'Pontaria', damage: '1d12', crit: '18/x2', equipped: true, desc: 'Arma simples leve, alcance curto.' },
            { id: 3, name: 'Proteção Leve', type: 'Proteção', cat: 'I', spaces: 2, defense: 5, equipped: true, desc: 'Jaqueta reforçada (+5 Defesa).' },
            { id: 4, name: 'Utensílio (+2 Perícia)', type: 'Geral', cat: 'I', spaces: 1, desc: 'Kit forense (+2 em Investigação).' }
          ],
          abilities: [
            { id: 21, name: 'Balística Avançada', source: 'Poder de Especialista', cost: 'Passivo', element: 'Nenhum', affinity: false, desc: 'Proficiência com armas táticas de fogo e +2 em rolagens de dano com armas de fogo.' }
          ]
        });
        ['Investigação', 'Percepção', 'Pontaria', 'Furtividade', 'Reflexos', 'Tecnologia', 'Medicina', 'Intuição', 'Crime', 'Acrobacia', 'Tática', 'Atualidades'].forEach(s => {
          ag.skills[s].rank = 5;
        });
        return ag;
      }

      // Default Ocultista Conduíte Desgarrado
      const ag = getDefaultState({
        name: 'Veríssimo Viana',
        player: 'Agente',
        origin: 'Desgarrado',
        charClass: 'Ocultista',
        path: 'Conduíte',
        rank: 'Operador',
        nex: 25,
        pp: 35,
        affinity: 'Morte',
        attributes: { AGI: 1, FOR: 1, INT: 3, PRE: 3, VIG: 2 },
        proficiencies: 'Armas Simples',
        currentPv: 35,
        currentPe: 35,
        currentSan: 40,
        inventory: [
          { id: 1, name: 'Punhal', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d4', crit: 'x3', equipped: true, desc: 'Punhal ritualístico gravado.' },
          { id: 2, name: 'Componentes Ritualísticos (Morte)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Cinzas e ossos para rituais de Morte.' },
          { id: 3, name: 'Componentes Ritualísticos (Energia)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Cristais e baterias para rituais de Energia.' },
          { id: 4, name: 'Vestimenta (+2 Perícia)', type: 'Geral', cat: 'I', spaces: 1, desc: 'Sobretudo ocultista (+2 Ocultismo).' }
        ],
        abilities: [
          { id: 31, name: 'Ritual Potente', source: 'Poder de Ocultista', cost: 'Passivo', element: 'Nenhum', affinity: false, desc: 'Você soma seu Intelecto nas rolagens de dano ou nos efeitos de cura de seus rituais.' }
        ],
        rituals: [
          { id: 101, name: 'Decadência', element: 'Morte', circle: '1', cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Fortitude reduz à metade', desc: 'Espirais de trevas envolvem sua mão e definham o alvo, que sofre 2d8+2 pontos de dano de Morte.', discente: '(+2 PE) muda a resistência para nenhuma e o dano para 3d8+3 com ataque corpo a corpo.', verdadeira: '(+5 PE) explosão de 6m causando 8d8+8. Requer 3º círculo.' },
          { id: 102, name: 'Cicatrização', element: 'Morte', circle: '1', cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Acelera o tempo ao redor das feridas do alvo, recuperando 3d8+3 PV (envelhece 1 ano).', discente: '(+2 PE) aumenta a cura para 5d8+5 PV.', verdadeira: '(+9 PE) cura 7d8+7 PV em seres escolhidos em alcance curto.' },
          { id: 103, name: 'Tela de Ruído', element: 'Energia', circle: '2', cast: 'Padrão ou Reação', range: 'Pessoal', target: 'Você', duration: 'Cena ou instantânea', resist: 'Nenhuma', desc: 'Concede 30 PV temporários contra dano físico ou reduz dano sofrido em 15 como reação.', discente: '(+3 PE) aumenta para 60 PV temporários ou redução de 30.', verdadeira: '(+7 PE) cria esfera impenetrável com 100 PV.' }
        ]
      });
      ['Fortitude', 'Sobrevivência', 'Ocultismo', 'Vontade', 'Investigação', 'Percepção', 'Iniciativa', 'Intuição'].forEach(s => {
        ag.skills[s].rank = 5;
      });
      return ag;
    }

    let rosterData = loadRoster();
    let state = getActiveAgentState();

    function loadRoster() {
      try {
        const rawRoster = localStorage.getItem(ROSTER_STORAGE_KEY);
        if (rawRoster) {
          const parsed = JSON.parse(rawRoster);
          if (parsed && Array.isArray(parsed.agents) && parsed.agents.length > 0) {
            return parsed;
          }
        }

        // Migrate legacy single sheet if present
        const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY) || localStorage.getItem('ordem_paranormal_sheet_v2');
        if (legacyRaw) {
          const legacyAgent = getDefaultState(JSON.parse(legacyRaw));
          if (!legacyAgent.name) legacyAgent.name = 'Agente Migrado';
          const initialRoster = { activeId: legacyAgent.id, view: 'hub', agents: [legacyAgent] };
          localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(initialRoster));
          return initialRoster;
        }
      } catch (e) {
        console.error('Erro ao carregar arquivo de agentes:', e);
      }

      // First run: populate with 2 rich sample agents
      const sample1 = createPresetObject('ocultista');
      const sample2 = createPresetObject('combatente');
      const freshRoster = {
        activeId: sample1.id,
        view: 'hub',
        agents: [sample1, sample2]
      };
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(freshRoster));
      return freshRoster;
    }

    function getActiveAgentState() {
      const found = rosterData.agents.find(a => a.id === rosterData.activeId);
      if (found) return { ...getDefaultState(), ...found };
      if (rosterData.agents.length > 0) {
        rosterData.activeId = rosterData.agents[0].id;
        return { ...getDefaultState(), ...rosterData.agents[0] };
      }
      const fallback = getDefaultState();
      rosterData.agents = [fallback];
      rosterData.activeId = fallback.id;
      return fallback;
    }

    function saveState() {
      try {
        state.updatedAt = Date.now();
        const idx = rosterData.agents.findIndex(a => a.id === state.id);
        if (idx >= 0) {
          rosterData.agents[idx] = state;
        } else {
          rosterData.agents.push(state);
          rosterData.activeId = state.id;
        }
        localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));

        const ind = document.getElementById('save-indicator');
        ind.textContent = '• Salvo agora';
        setTimeout(() => { ind.textContent = '• Salvo localmente'; }, 1500);
      } catch (e) {
        console.error('Erro ao salvar ficha:', e);
      }
    }

    function uploadAgentAvatar(event) {
      const file = event.target.files?.[0];
      const targetAgentId = event.currentTarget.dataset.agentId || state.id;
      event.target.value = '';
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast('Imagem Inválida', 'Escolha um arquivo de imagem.', 'ERRO');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast('Imagem Muito Grande', 'A imagem deve ter no máximo 5 MB.', 'ERRO');
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => showToast('Erro ao Ler Imagem', 'Não foi possível abrir esse arquivo.', 'ERRO');
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => showToast('Imagem Inválida', 'Não foi possível processar esse arquivo de imagem.', 'ERRO');
        image.onload = () => {
          const ratio = Math.min(1, 320 / Math.max(image.naturalWidth, image.naturalHeight));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
          canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
          const context = canvas.getContext('2d');
          if (!context) {
            showToast('Erro ao Processar Imagem', 'Seu navegador não conseguiu redimensionar a imagem.', 'ERRO');
            return;
          }
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const targetAgent = rosterData.agents.find(agent => agent.id === targetAgentId);
          if (!targetAgent) {
            showToast('Agente Não Encontrado', 'A ficha selecionada foi removida antes da imagem terminar de carregar.', 'ERRO');
            return;
          }
          targetAgent.avatar = canvas.toDataURL('image/jpeg', 0.76);
          targetAgent.updatedAt = Date.now();
          if (state.id === targetAgentId) state.avatar = targetAgent.avatar;
          saveState();
          if (rosterData.view === 'hub') renderHub();
          showToast('Foto Atualizada', `Foto de ${targetAgent.name || 'agente'} salva na ficha.`, '📷');
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    }

    function removeAgentAvatar(event) {
      const targetAgentId = event.currentTarget.dataset.agentId || state.id;
      const targetAgent = rosterData.agents.find(agent => agent.id === targetAgentId);
      if (!targetAgent?.avatar) return;
      targetAgent.avatar = '';
      targetAgent.updatedAt = Date.now();
      if (state.id === targetAgentId) state.avatar = '';
      saveState();
      if (rosterData.view === 'hub') renderHub();
      showToast('Foto Removida', `A foto de ${targetAgent.name || 'agente'} foi removida.`, '✓');
    }

    function getAgentAvatarMarkup(agent, sizeClass = 'w-11 h-11') {
      const initials = (agent.name || 'AG').trim().split(/\s+/).slice(0, 2).map(word => word[0]?.toUpperCase() || '').join('') || 'AG';
      const avatar = typeof agent.avatar === 'string' && agent.avatar.startsWith('data:image/jpeg;base64,')
        ? agent.avatar.replace(/[&"<>]/g, character => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[character])
        : '';
      const theme = ELEMENT_THEMES[agent.affinity] || ELEMENT_THEMES['Nenhuma'];
      const safeInitials = initials.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
      return avatar
        ? `<img src="${avatar}" alt="Foto do agente" class="${sizeClass} rounded-xl object-cover shrink-0 border" />`
        : `<div class="${sizeClass} rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border" style="background:${theme.soft}; border-color:${theme.border}; color:${theme.accent}">${safeInitials}</div>`;
    }

    function applyRemoteAgentToRoster(agent) {
      const index = rosterData.agents.findIndex((localAgent) => localAgent.id === agent.id);
      if (index < 0) return;
      rosterData.agents[index] = { ...agent };
      if (rosterData.activeId === agent.id) {
        state = { ...getDefaultState(), ...agent };
        refreshAll();
      } else if (rosterData.view === 'hub') {
        renderHub();
      }
    }

    // ==================== VIEW NAVIGATION (HUB <-> SHEET) ====================
    function openHubScreen() {
      saveState();
      rosterData.view = 'hub';
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
      applyViewVisibility();
      renderHub();
    }

    function openAgentSheet(agentId) {
      const target = rosterData.agents.find(a => a.id === agentId);
      if (!target) return;
      rosterData.activeId = agentId;
      rosterData.view = 'sheet';
      state = getActiveAgentState();
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
      applyViewVisibility();
      refreshAll();
    }

    function switchActiveAgent(agentId) {
      saveState();
      openAgentSheet(agentId);
      showToast('Agente Alternado', `Ficha ativa: ${state.name || 'Sem Nome'} (NEX ${state.nex}%)`, '⇄');
    }

    function applyViewVisibility() {
      const isHub = rosterData.view === 'hub';
      document.getElementById('hub-view').classList.toggle('hidden', !isHub);
      document.getElementById('sheet-view').classList.toggle('hidden', isHub);
      document.getElementById('sheet-view').classList.toggle('flex', !isHub);

      document.getElementById('btn-back-hub').classList.toggle('hidden', isHub);
      document.getElementById('quick-agent-switcher-wrap').classList.toggle('hidden', isHub);
      document.getElementById('quick-agent-switcher-wrap').classList.toggle('flex', !isHub);
      document.getElementById('btn-export-single').classList.toggle('hidden', isHub);
      document.getElementById('btn-reset-single').classList.toggle('hidden', isHub);

      if (isHub) {
        document.documentElement.style.setProperty('--accent', '#a855f7');
        document.documentElement.style.setProperty('--accent-soft', 'rgba(168, 85, 247, 0.14)');
        document.documentElement.style.setProperty('--accent-border', 'rgba(168, 85, 247, 0.42)');
      }
    }

    function computeAgentSnapshotStats(agentObj) {
      const prevState = state;
      state = { ...getDefaultState(), ...agentObj };
      const stats = calculateMaxStats();
      state = prevState;
      return stats;
    }

    function renderHub() {
      const search = (document.getElementById('hub-search').value || '').toLowerCase();
      const classFilter = document.getElementById('hub-filter-class').value;
      const affinityFilter = document.getElementById('hub-filter-affinity').value;

      const totalAgents = rosterData.agents.length;
      const avgNex = totalAgents
        ? Math.round(rosterData.agents.reduce((acc, a) => acc + (a.nex || 5), 0) / totalAgents)
        : 5;
      const affinityCount = rosterData.agents.filter(a => a.affinity && a.affinity !== 'Nenhuma').length;

      document.getElementById('hub-stat-total').textContent = totalAgents;
      document.getElementById('hub-stat-nex').textContent = `${avgNex}%`;
      document.getElementById('hub-stat-affinity').textContent = affinityCount;

      const filtered = rosterData.agents.filter(ag => {
        const matchSearch = (ag.name || '').toLowerCase().includes(search) ||
          (ag.player || '').toLowerCase().includes(search) ||
          (ag.origin || '').toLowerCase().includes(search) ||
          (ag.path || '').toLowerCase().includes(search);
        const matchClass = classFilter === 'Todas' || ag.charClass === classFilter;
        const matchAffinity = affinityFilter === 'Todas' || (ag.affinity || 'Nenhuma') === affinityFilter;
        return matchSearch && matchClass && matchAffinity;
      });

      const grid = document.getElementById('hub-agents-grid');

      const newCardHtml = `
        <button onclick="openNewAgentModal()"
          class="min-h-[245px] bg-surface/50 hover:bg-surface border-2 border-dashed border-borderSubtle hover:border-purple-500/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition group">
          <div class="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-2xl text-purple-400 group-hover:scale-110 transition">
            +
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white">Cadastrar Novo Agente</h3>
            <p class="text-xs text-zinc-400 mt-1">Ficha limpa ou modelo pronto de combate, investigação ou ocultismo</p>
          </div>
        </button>
      `;

      const agentCardsHtml = filtered.map(ag => {
        const theme = ELEMENT_THEMES[ag.affinity] || ELEMENT_THEMES['Nenhuma'];
        const snap = computeAgentSnapshotStats(ag);
        const pvPct = Math.min(100, Math.max(0, Math.round(((ag.currentPv ?? snap.maxPv) / snap.maxPv) * 100)));
        const pePct = Math.min(100, Math.max(0, Math.round(((ag.currentPe ?? snap.maxPe) / snap.maxPe) * 100)));
        const sanPct = Math.min(100, Math.max(0, Math.round(((ag.currentSan ?? snap.maxSan) / snap.maxSan) * 100)));

        const updatedDate = ag.updatedAt
          ? new Date(ag.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
          : 'Recente';

        return `
          <div class="bg-surface border border-borderSubtle hover:border-zinc-600 rounded-2xl p-5 flex flex-col justify-between gap-4 transition shadow-lg">
            <div class="space-y-3">
              <!-- Card Top: Avatar + Identity + NEX -->
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="relative group shrink-0">
                    <label title="Alterar foto do agente" class="relative block cursor-pointer rounded-xl focus-within:ring-2 focus-within:ring-purple-400">
                      ${getAgentAvatarMarkup(ag)}
                      <span class="pointer-events-none absolute inset-0 rounded-xl bg-black/50 flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition">📷</span>
                      <input type="file" accept="image/*" data-agent-id="${ag.id}" onchange="uploadAgentAvatar(event)" class="hidden" />
                    </label>
                    ${ag.avatar ? `<button type="button" data-agent-id="${ag.id}" onclick="removeAgentAvatar(event)" title="Remover foto" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-700 hover:bg-red-600 text-white text-xs opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">×</button>` : ''}
                  </div>
                  <div class="min-w-0">
                    <h3 class="font-bold text-base text-white truncate">${ag.name || 'Agente Sem Nome'}</h3>
                    <p class="text-xs text-zinc-400 truncate">${ag.charClass} • ${ag.path}</p>
                  </div>
                </div>
                <div class="text-right shrink-0">
                  <span class="inline-block font-mono text-xs font-bold px-2.5 py-1 rounded-lg border"
                    style="background:${theme.soft}; border-color:${theme.border}; color:${theme.accent}">
                    NEX ${ag.nex}%
                  </span>
                </div>
              </div>

              <!-- Meta Tags -->
              <div class="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                <span class="px-2 py-0.5 rounded bg-void border border-borderSubtle text-zinc-300">${ag.origin}</span>
                <span class="px-2 py-0.5 rounded bg-void border border-borderSubtle text-zinc-400">${ag.rank}</span>
                ${ag.affinity && ag.affinity !== 'Nenhuma'
                  ? `<span class="px-2 py-0.5 rounded bg-void border border-borderSubtle" style="color:${theme.accent}">★ ${ag.affinity}</span>`
                  : ''}
              </div>

              <!-- Compact Vital Bars -->
              <div class="bg-void border border-borderSubtle/80 rounded-xl p-2.5 space-y-2 text-[11px] font-mono">
                <div>
                  <div class="flex justify-between text-zinc-400 mb-0.5">
                    <span class="text-rose-400 font-semibold">PV</span>
                    <span>${ag.currentPv ?? snap.maxPv}/${snap.maxPv}</span>
                  </div>
                  <div class="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                    <div class="h-full bg-rose-500" style="width:${pvPct}%"></div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2.5">
                  <div>
                    <div class="flex justify-between text-zinc-400 mb-0.5">
                      <span class="text-amber-300 font-semibold">PE</span>
                      <span>${ag.currentPe ?? snap.maxPe}/${snap.maxPe}</span>
                    </div>
                    <div class="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                      <div class="h-full bg-amber-400" style="width:${pePct}%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-zinc-400 mb-0.5">
                      <span class="text-sky-300 font-semibold">SAN</span>
                      <span>${ag.currentSan ?? snap.maxSan}/${snap.maxSan}</span>
                    </div>
                    <div class="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                      <div class="h-full bg-sky-400" style="width:${sanPct}%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="space-y-2.5 pt-1 border-t border-borderSubtle/60">
              <div class="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>Jogador: ${ag.player || '—'}</span>
                <span>Editado: ${updatedDate}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button onclick="openAgentSheet('${ag.id}')"
                  class="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition hover:brightness-110"
                  style="background:${theme.accent}">
                  Abrir Ficha →
                </button>
                <button onclick="duplicateAgent('${ag.id}')" title="Duplicar Agente (Backup de NEX)"
                  class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs text-zinc-300 transition">
                  📋
                </button>
                <button onclick="exportSingleAgentById('${ag.id}')" title="Exportar JSON desta ficha"
                  class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs text-zinc-300 transition">
                  💾
                </button>
                <button onclick="deleteAgent('${ag.id}')" title="Excluir Ficha"
                  class="px-2.5 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-900/40 text-xs text-red-300 transition">
                  🗑
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      grid.innerHTML = newCardHtml + agentCardsHtml;
    }

    function openNewAgentModal() {
      document.getElementById('new-agent-name').value = '';
      document.getElementById('new-agent-player').value = '';
      document.getElementById('new-agent-origin').innerHTML = ORIGINS_DB.map(o => `<option value="${o.name}">${o.name}</option>`).join('');
      openModal('modal-new-agent');
    }

    function createCustomAgent() {
      const name = document.getElementById('new-agent-name').value.trim() || 'Novo Agente';
      const player = document.getElementById('new-agent-player').value.trim();
      const origin = document.getElementById('new-agent-origin').value;
      const charClass = document.getElementById('new-agent-class').value;
      const defaultPath = Object.keys(CLASSES_DB[charClass].paths)[0];

      const newAgent = getDefaultState({
        name,
        player,
        origin,
        charClass,
        path: defaultPath
      });

      // Apply automatic origin & class skill trainings + initial stats
      const prevState = state;
      state = newAgent;
      enforceMandatorySkills();
      const maxStats = calculateMaxStats();
      state.currentPv = maxStats.maxPv;
      state.currentPe = maxStats.maxPe;
      state.currentSan = maxStats.maxSan;
      state = prevState;

      rosterData.agents.unshift(newAgent);
      closeModal('modal-new-agent');
      openAgentSheet(newAgent.id);
      showToast('Agente Recrutado', `${name} (${charClass} • ${origin}) criado com treinamentos aplicados!`, 'NEX 5%');
    }

    function createPresetAgent(presetType) {
      const presetAgent = createPresetObject(presetType);
      presetAgent.id = generateAgentId();
      presetAgent.updatedAt = Date.now();
      rosterData.agents.unshift(presetAgent);
      closeModal('modal-new-agent');
      openAgentSheet(presetAgent.id);
      showToast('Modelo Carregado', `${presetAgent.name} pronto para operação!`, `NEX ${presetAgent.nex}%`);
    }

    function duplicateAgent(agentId) {
      const original = rosterData.agents.find(a => a.id === agentId);
      if (!original) return;
      const copy = JSON.parse(JSON.stringify(original));
      copy.id = generateAgentId();
      copy.name = `${original.name || 'Agente'} (Cópia)`;
      copy.updatedAt = Date.now();
      rosterData.agents.unshift(copy);
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
      renderHub();
      showToast('Ficha Duplicada', `Cópia "${copy.name}" criada com sucesso.`, '📋');
    }

    let pendingDeleteId = null;
    function deleteAgent(agentId) {
      const target = rosterData.agents.find(a => a.id === agentId);
      if (!target) return;

      if (pendingDeleteId !== agentId) {
        pendingDeleteId = agentId;
        showToast('Confirmar Exclusão?', `Clique novamente na lixeira de "${target.name}" em 4s para apagar.`, '!');
        setTimeout(() => { if (pendingDeleteId === agentId) pendingDeleteId = null; }, 4000);
        return;
      }

      pendingDeleteId = null;
      rosterData.agents = rosterData.agents.filter(a => a.id !== agentId);
      if (rosterData.agents.length === 0) {
        const fallback = getDefaultState({ name: 'Agente Recruta' });
        rosterData.agents.push(fallback);
      }
      if (rosterData.activeId === agentId) {
        rosterData.activeId = rosterData.agents[0].id;
        state = getActiveAgentState();
      }
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
      renderHub();
      showToast('Ficha Excluída', `O registro de "${target.name}" foi removido do arquivo.`, '🗑');
    }

    // ==================== AUTOMATIC SKILL TRAINING ENGINE ====================
    function getMandatorySkills() {
      const originObj = ORIGINS_DB.find(o => o.name === state.origin);
      const originSkills = originObj ? [...originObj.skills] : [];
      const classSkills = [];

      if (state.charClass === 'Combatente') {
        if (state.combatenteAttackSkill) classSkills.push(state.combatenteAttackSkill);
        if (state.combatenteDefenseSkill) classSkills.push(state.combatenteDefenseSkill);
      } else if (state.charClass === 'Ocultista') {
        classSkills.push('Ocultismo', 'Vontade');
      }

      const uniqueMandatory = Array.from(new Set([...originSkills, ...classSkills]));
      return {
        originSkills,
        classSkills,
        uniqueMandatory
      };
    }

    function getSkillQuotaSummary() {
      const intVal = state.attributes.INT;
      const mandatory = getMandatorySkills();

      // Base class free trained skills (excluding mandatory ones)
      let classFreeBase = 1; // Combatente: 1 + INT
      let upgradePerMilestone = 2; // Combatente: 2 + INT at 35% and 70%

      if (state.charClass === 'Especialista') {
        classFreeBase = 7; // Especialista: 7 + INT
        upgradePerMilestone = 5; // Especialista: 5 + INT
      } else if (state.charClass === 'Ocultista') {
        classFreeBase = 3; // Ocultista: 3 + INT
        upgradePerMilestone = 3; // Ocultista: 3 + INT
      }

      // Origin extra free skill slots (Personalizada = 2, Amnésico = 2)
      const originFreeBase = (state.origin === 'Personalizada' || state.origin === 'Amnésico') ? 2 : 0;

      // Total allowed trained skills (rank >= 5)
      const freeTrainedAllowed = Math.max(0, classFreeBase + intVal + originFreeBase);
      const totalTrainedAllowed = mandatory.uniqueMandatory.length + freeTrainedAllowed;

      // Count actual trained, veteran, expert
      let actualTrained = 0;
      let actualVeteranOrHigher = 0;
      let actualExpert = 0;

      OFFICIAL_SKILLS.forEach(s => {
        const r = state.skills[s.name]?.rank || 0;
        if (r >= 5) actualTrained++;
        if (r >= 10) actualVeteranOrHigher++;
        if (r >= 15) actualExpert++;
      });

      const veteranSlotsAllowed = state.nex >= 35 ? Math.max(0, upgradePerMilestone + intVal) : 0;
      const expertSlotsAllowed = state.nex >= 70 ? Math.max(0, upgradePerMilestone + intVal) : 0;

      return {
        mandatory,
        freeTrainedAllowed,
        totalTrainedAllowed,
        actualTrained,
        veteranSlotsAllowed,
        actualVeteranOrHigher,
        expertSlotsAllowed,
        actualExpert
      };
    }

    function enforceMandatorySkills() {
      const { uniqueMandatory } = getMandatorySkills();
      uniqueMandatory.forEach(skillName => {
        if (state.skills[skillName] && state.skills[skillName].rank < 5) {
          state.skills[skillName].rank = 5;
        }
      });
    }

    function setCombatenteChoice(slotType, skillName) {
      const prevSkill = slotType === 'attack' ? state.combatenteAttackSkill : state.combatenteDefenseSkill;
      if (prevSkill === skillName) return;

      // Reset previous mandatory skill to 0 only if it wasn't also granted by Origin
      const originObj = ORIGINS_DB.find(o => o.name === state.origin);
      const originSkills = originObj ? originObj.skills : [];
      if (prevSkill && !originSkills.includes(prevSkill) && state.skills[prevSkill]?.rank === 5) {
        state.skills[prevSkill].rank = 0;
      }

      if (slotType === 'attack') state.combatenteAttackSkill = skillName;
      if (slotType === 'defense') state.combatenteDefenseSkill = skillName;

      enforceMandatorySkills();
      saveState();
      refreshAll();
    }

    function togglePeritoSkill(skillName) {
      if (!Array.isArray(state.peritoSkills)) state.peritoSkills = [];
      const idx = state.peritoSkills.indexOf(skillName);
      if (idx >= 0) {
        state.peritoSkills.splice(idx, 1);
      } else {
        if (state.peritoSkills.length >= 2) {
          state.peritoSkills.shift();
        }
        state.peritoSkills.push(skillName);
      }
      saveState();
      refreshAll();
    }

    function getPeritoDie() {
      if (state.nex >= 85) return '1d12';
      if (state.nex >= 55) return '1d10';
      if (state.nex >= 25) return '1d8';
      return '1d6';
    }

