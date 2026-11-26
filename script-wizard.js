    // ==================== GUIDED CHARACTER CREATION WIZARD ====================
    const WIZARD_CLASS_GUIDES = {
      'Combatente': {
        icon: '⚔️',
        tagline: 'Linha de frente, resistência e dano pesado.',
        summary: 'Treinado para lutar com todo tipo de armas, e com a força e a coragem para encarar os perigos de frente. Prefere abordagens diretas, atirando primeiro e perguntando depois.',
        recommendedAttrs: { AGI: 2, FOR: 3, INT: 1, PRE: 1, VIG: 2 },
        recommendedSkills: ['Iniciativa', 'Atletismo'],
        starterKit: [
          { name: 'Machado', type: 'Arma', cat: 'I', spaces: 1, skill: 'Luta', damage: '1d8', crit: 'x3', equipped: true, desc: 'Arma tática de alto impacto.' },
          { name: 'Pistola', type: 'Arma', cat: 'I', spaces: 1, skill: 'Pontaria', damage: '1d12', crit: '18/x2', equipped: true, desc: 'Arma de fogo leve.' },
          { name: 'Proteção Leve', type: 'Proteção', cat: 'I', spaces: 2, defense: 5, equipped: true, desc: 'Colete balístico (+5 Defesa).' },
          { name: 'Balas Curtas (Pacote)', type: 'Munição/Explosivo', cat: '0', spaces: 1, desc: 'Munição para pistola.' }
        ]
      },
      'Especialista': {
        icon: '🕵️',
        tagline: 'Investigação, perícias, furtividade e suporte.',
        summary: 'Um agente que confia mais em esperteza do que em força bruta. Vale-se de conhecimento técnico, raciocínio rápido ou lábia para resolver mistérios e enfrentar o paranormal.',
        recommendedAttrs: { AGI: 3, FOR: 1, INT: 3, PRE: 2, VIG: 1 },
        recommendedSkills: ['Investigação', 'Percepção', 'Pontaria', 'Furtividade', 'Reflexos', 'Tecnologia', 'Medicina', 'Intuição', 'Crime', 'Acrobacia'],
        starterKit: [
          { name: 'Revólver', type: 'Arma', cat: 'I', spaces: 1, skill: 'Pontaria', damage: '2d6', crit: '19/x3', equipped: true, desc: 'Arma confiável de curto alcance.' },
          { name: 'Faca', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d4', crit: '19/x2', equipped: true, desc: 'Lâmina tática discreta.' },
          { name: 'Proteção Leve', type: 'Proteção', cat: 'I', spaces: 2, defense: 5, equipped: true, desc: 'Jaqueta reforçada (+5 Defesa).' },
          { name: 'Kit de Perícia', type: 'Geral', cat: '0', spaces: 1, desc: 'Ferramentas de investigação e campo.' },
          { name: 'Balas Curtas (Pacote)', type: 'Munição/Explosivo', cat: '0', spaces: 1, desc: 'Munição para revólver.' }
        ]
      },
      'Ocultista': {
        icon: '🔮',
        tagline: 'Rituais paranormais, conhecimento proibido e controle.',
        summary: 'Estudioso que busca compreender e dominar os mistérios paranormais para combater o próprio Outro Lado, possuindo talento para se conectar com os elementos. Mas lembre-se: O Outro Lado tem seu preço ',
        recommendedAttrs: { AGI: 1, FOR: 1, INT: 3, PRE: 3, VIG: 2 },
        recommendedSkills: ['Investigação', 'Percepção', 'Iniciativa', 'Intuição', 'Religião', 'Atualidades'],
        starterKit: [
          { name: 'Punhal', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d4', crit: 'x3', equipped: true, desc: 'Punhal cerimonial.' },
          { name: 'Componentes Ritualísticos (Morte)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Permite conjurar rituais de Morte.' },
          { name: 'Componentes Ritualísticos (Energia)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Permite conjurar rituais de Energia.' },
          { name: 'Componentes Ritualísticos (Sangue)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Permite conjurar rituais de Sangue.' },
          { name: 'Componentes Ritualísticos (Conhecimento)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Permite conjurar rituais de Conhecimento.' }
        ]
      }
    };

    let wizState = {
      step: 1,
      charClass: 'Combatente',
      origin: 'Policial',
      attributes: { AGI: 2, FOR: 3, INT: 1, PRE: 1, VIG: 2 },
      combatenteAttack: 'Luta',
      combatenteDefense: 'Fortitude',
      selectedSkills: [],
      selectedRituals: ['Decadência', 'Cicatrização', 'Eletrocussão'],
      name: '',
      player: '',
      notes: '',
      applyStarterKit: true
    };

    function openGuidedWizardModal() {
      wizState = {
        step: 1,
        charClass: 'Combatente',
        origin: 'Policial',
        attributes: { ...WIZARD_CLASS_GUIDES['Combatente'].recommendedAttrs },
        combatenteAttack: 'Luta',
        combatenteDefense: 'Fortitude',
        selectedSkills: [],
        selectedRituals: ['Decadência', 'Cicatrização', 'Eletrocussão'],
        name: '',
        player: '',
        notes: '',
        applyStarterKit: true
      };
      autoFillWizardSkills();
      renderGuidedWizard();
      openModal('modal-guided-wizard');
    }

    function getWizardFreeSkillQuota() {
      const intVal = wizState.attributes.INT;
      const base = wizState.charClass === 'Especialista' ? 7 : wizState.charClass === 'Ocultista' ? 3 : 1;
      const originBonus = (wizState.origin === 'Personalizada' || wizState.origin === 'Amnésico') ? 2 : 0;
      return Math.max(0, base + intVal + originBonus);
    }

    function getWizardLockedSkills() {
      const originObj = ORIGINS_DB.find(o => o.name === wizState.origin);
      const list = originObj ? [...originObj.skills] : [];
      if (wizState.charClass === 'Combatente') {
        list.push(wizState.combatenteAttack, wizState.combatenteDefense);
      } else if (wizState.charClass === 'Ocultista') {
        list.push('Ocultismo', 'Vontade');
      }
      return Array.from(new Set(list));
    }

    function autoFillWizardSkills() {
      const locked = getWizardLockedSkills();
      const quota = getWizardFreeSkillQuota();
      const guideList = WIZARD_CLASS_GUIDES[wizState.charClass].recommendedSkills;
      const picked = [];

      for (const sk of guideList) {
        if (!locked.includes(sk) && picked.length < quota) picked.push(sk);
      }
      for (const s of OFFICIAL_SKILLS) {
        if (!locked.includes(s.name) && !picked.includes(s.name) && picked.length < quota) {
          picked.push(s.name);
        }
      }
      wizState.selectedSkills = picked;
    }

    function wizSelectClass(cls) {
      wizState.charClass = cls;
      wizState.attributes = { ...WIZARD_CLASS_GUIDES[cls].recommendedAttrs };
      autoFillWizardSkills();
      renderGuidedWizard();
    }

    function wizSelectOrigin(originName) {
      wizState.origin = originName;
      autoFillWizardSkills();
      renderGuidedWizard();
    }

    function wizAdjustAttr(key, delta) {
      const cur = wizState.attributes[key];
      const next = cur + delta;
      const totalUsed = Object.values(wizState.attributes).reduce((a, b) => a + b, 0) - 5;
      if (next < 0 || next > 3) return;
      if (delta > 0 && totalUsed >= 4) return;
      wizState.attributes[key] = next;
      autoFillWizardSkills();
      renderGuidedWizard();
    }

    function wizToggleSkill(skillName) {
      const locked = getWizardLockedSkills();
      if (locked.includes(skillName)) return;
      const quota = getWizardFreeSkillQuota();
      const idx = wizState.selectedSkills.indexOf(skillName);
      if (idx >= 0) {
        wizState.selectedSkills.splice(idx, 1);
      } else if (wizState.selectedSkills.length < quota) {
        wizState.selectedSkills.push(skillName);
      } else {
        showToast('Limite Atingido', `Você já escolheu todas as ${quota} perícias livres permitidas.`, '!');
        return;
      }
      renderGuidedWizard();
    }

    function wizToggleRitual(ritualName) {
      const idx = wizState.selectedRituals.indexOf(ritualName);
      if (idx >= 0) {
        wizState.selectedRituals.splice(idx, 1);
      } else if (wizState.selectedRituals.length < 3) {
        wizState.selectedRituals.push(ritualName);
      } else {
        showToast('Máximo de 3 Rituais', 'Ocultistas iniciam em NEX 5% com 3 rituais de 1º círculo.', '!');
        return;
      }
      renderGuidedWizard();
    }

    function wizardPrevStep() {
      if (wizState.step > 1) {
        wizState.step--;
        renderGuidedWizard();
      }
    }

    function wizardNextStep() {
      if (wizState.step < 5) {
        wizState.step++;
        renderGuidedWizard();
      } else {
        finalizeGuidedWizard();
      }
    }

    function renderGuidedWizard() {
      const stepsMeta = [
        { num: 1, label: '1. Classe', sub: 'Passo 1 de 5 • Escolha como seu agente atua nas missões' },
        { num: 2, label: '2. Passado', sub: 'Passo 2 de 5 • O que seu personagem fazia antes da Ordem?' },
        { num: 3, label: '3. Atributos', sub: 'Passo 3 de 5 • Distribua seus 4 pontos iniciais (0 a 3)' },
        { num: 4, label: '4. Perícias', sub: 'Passo 4 de 5 • Escolha em quais áreas você é treinado (+5)' },
        { num: 5, label: '5. Finalizar', sub: 'Passo 5 de 5 • Nome, kit inicial e revisão da ficha' }
      ];

      const curMeta = stepsMeta[wizState.step - 1];
      document.getElementById('wiz-step-subtitle').textContent = curMeta.sub;
      document.getElementById('wiz-live-preview-text').textContent = `${wizState.charClass} • ${wizState.origin} • NEX 5%`;

      document.getElementById('wiz-stepper-bar').innerHTML = stepsMeta.map(s => `
        <button onclick="wizState.step=${s.num}; renderGuidedWizard();"
          class="py-1.5 px-2 rounded-lg text-[11px] font-mono font-semibold text-center truncate border transition ${
            wizState.step === s.num
              ? 'accent-bg text-white accent-border'
              : wizState.step > s.num
                ? 'bg-void text-emerald-400 border-emerald-500/30'
                : 'bg-void/50 text-zinc-500 border-borderSubtle'
          }">
          ${s.label}
        </button>
      `).join('');

      document.getElementById('wiz-btn-prev').classList.toggle('invisible', wizState.step === 1);
      const nextBtn = document.getElementById('wiz-btn-next');
      nextBtn.textContent = wizState.step === 5 ? '✓ Criar Agente e Abrir Ficha' : 'Próximo Passo →';

      const body = document.getElementById('wiz-body');

      // STEP 1: CLASSE
      if (wizState.step === 1) {
        body.innerHTML = `
          <div class="bg-void border border-borderSubtle rounded-xl p-3.5 text-xs text-zinc-300">
            💡 <strong>Dica para iniciantes:</strong> Não se preocupe com números agora. Escolha o estilo de jogo que mais combina com você — o sistema ajustará sua vida, sanidade e atributos recomendados automaticamente.
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            ${Object.entries(WIZARD_CLASS_GUIDES).map(([clsName, info]) => {
              const selected = wizState.charClass === clsName;
              const statsText = clsName === 'Combatente' ? 'PV Alto (20+VIG) • Poucas Perícias'
                : clsName === 'Especialista' ? 'PV Médio (16+VIG) • Muitas Perícias'
                : 'SAN Alta (20) • Lança Rituais';
              return `
                <div onclick="wizSelectClass('${clsName}')"
                  class="cursor-pointer rounded-2xl p-5 border-2 transition flex flex-col justify-between gap-4 ${
                    selected ? 'accent-border accent-soft-bg shadow-lg' : 'bg-void border-borderSubtle hover:border-zinc-600'
                  }">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-2xl">${info.icon}</span>
                      ${selected ? '<span class="text-[10px] font-mono px-2 py-0.5 rounded accent-bg text-white font-bold">Selecionada</span>' : ''}
                    </div>
                    <h4 class="text-lg font-bold text-white">${clsName}</h4>
                    <p class="text-xs font-medium accent-text">${info.tagline}</p>
                    <p class="text-xs text-zinc-300 leading-relaxed pt-1">${info.summary}</p>
                  </div>
                  <div class="pt-2 border-t border-borderSubtle/70 text-[11px] font-mono text-zinc-400">
                    ${statsText}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // STEP 2: ORIGEM
      if (wizState.step === 2) {
        const curOrigin = ORIGINS_DB.find(o => o.name === wizState.origin) || ORIGINS_DB[0];
        body.innerHTML = `
          <div class="bg-void border border-borderSubtle rounded-xl p-3.5 text-xs text-zinc-300">
            💡 <strong>O que é a Origem?</strong> É a profissão ou história de vida do seu personagem antes de descobrir o paranormal. Ela garante <strong>2 perícias treinadas (+5)</strong> e um <strong>poder exclusivo</strong>.
          </div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[340px] overflow-y-auto pr-1">
              ${ORIGINS_DB.map(o => {
                const active = wizState.origin === o.name;
                return `
                  <button onclick="wizSelectOrigin('${o.name}')"
                    class="p-2.5 rounded-xl border text-left transition ${
                      active ? 'accent-border accent-soft-bg text-white font-semibold' : 'bg-void border-borderSubtle text-zinc-300 hover:border-zinc-600'
                    }">
                    <div class="text-xs truncate">${o.name}</div>
                    <div class="text-[10px] font-mono text-zinc-400 truncate mt-0.5">${o.skills.length ? o.skills.join(', ') : '2 Livres'}</div>
                  </button>
                `;
              }).join('')}
            </div>
            <div class="md:col-span-5 bg-void border accent-border rounded-2xl p-4 flex flex-col justify-between gap-3">
              <div class="space-y-2">
                <span class="text-[10px] font-mono uppercase accent-text font-bold">Origem Selecionada</span>
                <h4 class="text-lg font-bold text-white">${curOrigin.name}</h4>
                <div class="flex flex-wrap gap-1.5">
                  ${(curOrigin.skills.length ? curOrigin.skills : ['2 Perícias à Escolha']).map(s =>
                    `<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-borderSubtle text-zinc-200">✓ ${s}</span>`
                  ).join('')}
                </div>
                <div class="pt-2 border-t border-borderSubtle">
                  <span class="block text-xs font-bold text-amber-300">${curOrigin.power}</span>
                  <p class="text-xs text-zinc-300 leading-relaxed mt-1">${curOrigin.desc}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // STEP 3: ATRIBUTOS
      if (wizState.step === 3) {
        const spent = Object.values(wizState.attributes).reduce((a, b) => a + b, 0) - 5;
        const remaining = 4 - spent;
        const attrDescriptions = {
          AGI: 'Define sua Defesa, reflexos, furtividade e pontaria (armas de fogo).',
          FOR: 'Define quanto peso você carrega na mochila e ataques corpo a corpo (Luta).',
          INT: 'Define quantas perícias extras você aprende e testes de investigação/tecnologia.',
          PRE: 'Define seus Pontos de Esforço (PE), resistência mental e testes sociais.',
          VIG: 'Define seus Pontos de Vida (PV) máximos e resistência física (Fortitude).'
        };

        body.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2 bg-void border border-borderSubtle rounded-xl p-3.5">
            <p class="text-xs text-zinc-300">
              Todos começam com <strong>1</strong> em cada atributo. Você tem <strong>4 pontos</strong> para distribuir (máximo 3 por atributo, ou reduza um atributo para 0 para ganhar +1 ponto).
            </p>
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-xs font-mono px-3 py-1 rounded-full border ${
                remaining === 0 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'accent-border accent-soft-bg accent-text'
              }">
                Pontos Restantes: <strong>${remaining}</strong>
              </span>
              <button onclick="wizState.attributes={...WIZARD_CLASS_GUIDES[wizState.charClass].recommendedAttrs}; autoFillWizardSkills(); renderGuidedWizard();"
                class="px-2.5 py-1 rounded-lg bg-elevated hover:bg-zinc-800 border border-borderSubtle text-[11px] text-zinc-200">
                Restaurar Sugestão
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
            ${ATTRIBUTE_INFO.map(a => {
              const val = wizState.attributes[a.key];
              return `
                <div class="bg-void border border-borderSubtle rounded-2xl p-4 flex flex-col justify-between gap-3 text-center">
                  <div>
                    <span class="text-xs font-bold uppercase tracking-wider accent-text">${a.name}</span>
                    <div class="text-3xl font-mono font-bold text-white my-2">${val}</div>
                    <div class="flex items-center justify-center gap-2">
                      <button onclick="wizAdjustAttr('${a.key}', -1)" ${val <= 0 ? 'disabled' : ''}
                        class="w-9 h-8 rounded-lg bg-elevated hover:bg-zinc-700 disabled:opacity-30 font-mono font-bold text-white">-</button>
                      <button onclick="wizAdjustAttr('${a.key}', 1)" ${val >= 3 || remaining <= 0 ? 'disabled' : ''}
                        class="w-9 h-8 rounded-lg bg-elevated hover:bg-zinc-700 disabled:opacity-30 font-mono font-bold text-white">+</button>
                    </div>
                  </div>
                  <p class="text-[11px] text-zinc-400 leading-snug text-left border-t border-borderSubtle/70 pt-2">${attrDescriptions[a.key]}</p>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // STEP 4: PERÍCIAS (& RITUAIS SE OCULTISTA)
      if (wizState.step === 4) {
        const locked = getWizardLockedSkills();
        const quota = getWizardFreeSkillQuota();
        const firstCircleRituals = RITUALS_COMPENDIUM.filter(r => r.circle === 1);

        body.innerHTML = `
          <div class="bg-void border border-borderSubtle rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span class="text-zinc-300">
              Perícias marcadas com 🔒 já vêm da sua Origem/Classe. Escolha mais <strong>${quota}</strong> perícias livres (já pré-selecionamos boas opções para você!):
            </span>
            <span class="font-mono px-2.5 py-1 rounded-lg accent-soft-bg accent-text border accent-border">
              Escolhidas: <strong>${wizState.selectedSkills.length}</strong> / ${quota}
            </span>
          </div>

          ${wizState.charClass === 'Combatente' ? `
            <div class="bg-void border border-borderSubtle rounded-xl p-3 flex flex-wrap items-center gap-3 text-xs">
              <span class="text-zinc-400">Foco do Combatente:</span>
              <div class="inline-flex rounded-lg bg-surface p-0.5 border border-borderSubtle">
                <button onclick="wizState.combatenteAttack='Luta'; autoFillWizardSkills(); renderGuidedWizard();" class="px-2.5 py-1 rounded ${wizState.combatenteAttack==='Luta'?'accent-bg text-white':'text-zinc-400'}">Corpo a Corpo (Luta)</button>
                <button onclick="wizState.combatenteAttack='Pontaria'; autoFillWizardSkills(); renderGuidedWizard();" class="px-2.5 py-1 rounded ${wizState.combatenteAttack==='Pontaria'?'accent-bg text-white':'text-zinc-400'}">Armas de Fogo (Pontaria)</button>
              </div>
              <div class="inline-flex rounded-lg bg-surface p-0.5 border border-borderSubtle">
                <button onclick="wizState.combatenteDefense='Fortitude'; autoFillWizardSkills(); renderGuidedWizard();" class="px-2.5 py-1 rounded ${wizState.combatenteDefense==='Fortitude'?'accent-bg text-white':'text-zinc-400'}">Resistência (Fortitude)</button>
                <button onclick="wizState.combatenteDefense='Reflexos'; autoFillWizardSkills(); renderGuidedWizard();" class="px-2.5 py-1 rounded ${wizState.combatenteDefense==='Reflexos'?'accent-bg text-white':'text-zinc-400'}">Esquiva (Reflexos)</button>
              </div>
            </div>
          ` : ''}

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[240px] overflow-y-auto pr-1">
            ${OFFICIAL_SKILLS.map(s => {
              const isLocked = locked.includes(s.name);
              const isPicked = wizState.selectedSkills.includes(s.name);
              const active = isLocked || isPicked;
              return `
                <button onclick="wizToggleSkill('${s.name}')"
                  class="px-3 py-2 rounded-xl border text-left text-xs flex items-center justify-between gap-1 transition ${
                    isLocked
                      ? 'bg-surface border-emerald-500/40 text-emerald-300 cursor-default'
                      : isPicked
                        ? 'accent-soft-bg accent-border text-white font-semibold'
                        : 'bg-void border-borderSubtle text-zinc-400 hover:border-zinc-600'
                  }">
                  <span class="truncate">${s.name}</span>
                  <span class="font-mono text-[10px] shrink-0">${isLocked ? '🔒' : active ? '✓ +5' : s.attr}</span>
                </button>
              `;
            }).join('')}
          </div>

          ${wizState.charClass === 'Ocultista' ? `
            <div class="pt-2 border-t border-borderSubtle space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold accent-text">🔮 Grimório Inicial do Ocultista (Escolha 3 Rituais de 1º Círculo)</span>
                <span class="font-mono text-zinc-300">${wizState.selectedRituals.length} / 3</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 max-h-[160px] overflow-y-auto pr-1">
                ${firstCircleRituals.map(r => {
                  const chosen = wizState.selectedRituals.includes(r.name);
                  return `
                    <button onclick="wizToggleRitual('${r.name}')"
                      class="p-2.5 rounded-xl border text-left transition ${
                        chosen ? 'accent-border accent-soft-bg text-white' : 'bg-void border-borderSubtle text-zinc-400 hover:border-zinc-600'
                      }">
                      <div class="flex items-center justify-between text-xs font-semibold">
                        <span class="truncate">${r.name}</span>
                        <span class="text-[10px] font-mono accent-text">${r.element}</span>
                      </div>
                      <p class="text-[10px] text-zinc-400 line-clamp-2 mt-1">${r.desc}</p>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
        `;
      }

      // STEP 5: IDENTIDADE, KIT INICIAL & RESUMO
      if (wizState.step === 5) {
        const tempAg = buildAgentFromWizard();
        const snap = computeAgentSnapshotStats(tempAg);
        const allTrained = Array.from(new Set([...getWizardLockedSkills(), ...wizState.selectedSkills]));

        body.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-6 space-y-3 text-xs">
              <div>
                <label class="block text-zinc-400 mb-1">Nome do Agente *</label>
                <input type="text" id="wiz-input-name" value="${wizState.name}" oninput="wizState.name=this.value" placeholder="Ex: Arthur Cervero, Liz Webber..."
                  class="w-full bg-void border border-borderSubtle focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white outline-none" />
              </div>
              <div>
                <label class="block text-zinc-400 mb-1">Seu Nome (Jogador)</label>
                <input type="text" id="wiz-input-player" value="${wizState.player}" oninput="wizState.player=this.value" placeholder="Opcional"
                  class="w-full bg-void border border-borderSubtle rounded-xl px-3.5 py-2 text-white outline-none" />
              </div>
              <div>
                <label class="block text-zinc-400 mb-1">Conceito / História Rápida</label>
                <textarea rows="3" oninput="wizState.notes=this.value" placeholder="Ex: Ex-detetive que viu algo impossível durante uma investigação..."
                  class="w-full bg-void border border-borderSubtle rounded-xl p-3 text-zinc-200 outline-none resize-none">${wizState.notes}</textarea>
              </div>
              <label class="flex items-center gap-2.5 bg-void border border-borderSubtle rounded-xl p-3 cursor-pointer">
                <input type="checkbox" ${wizState.applyStarterKit ? 'checked' : ''} onchange="wizState.applyStarterKit=this.checked; renderGuidedWizard();" />
                <div>
                  <span class="font-semibold text-white block">Incluir Kit Inicial Recomendado (Patente Recruta)</span>
                  <span class="text-[11px] text-zinc-400">Adiciona automaticamente armas, proteção e munição/componentes ideais para ${wizState.charClass}.</span>
                </div>
              </label>
            </div>

            <div class="md:col-span-6 bg-void border accent-border rounded-2xl p-4 space-y-3">
              <span class="text-[10px] font-mono uppercase accent-text font-bold">Resumo Automático da Ficha (NEX 5%)</span>
              <div class="grid grid-cols-4 gap-2 text-center font-mono">
                <div class="bg-surface rounded-xl p-2 border border-borderSubtle">
                  <span class="block text-[10px] text-rose-400">PV</span>
                  <strong class="text-base text-white">${snap.maxPv}</strong>
                </div>
                <div class="bg-surface rounded-xl p-2 border border-borderSubtle">
                  <span class="block text-[10px] text-amber-300">PE</span>
                  <strong class="text-base text-white">${snap.maxPe}</strong>
                </div>
                <div class="bg-surface rounded-xl p-2 border border-borderSubtle">
                  <span class="block text-[10px] text-sky-300">SAN</span>
                  <strong class="text-base text-white">${snap.maxSan}</strong>
                </div>
                <div class="bg-surface rounded-xl p-2 border border-borderSubtle">
                  <span class="block text-[10px] text-zinc-400">Defesa</span>
                  <strong class="text-base text-white">${snap.defense}</strong>
                </div>
              </div>

              <div class="text-xs space-y-1.5">
                <div class="text-zinc-400">Classe & Origem: <strong class="text-white">${wizState.charClass} • ${wizState.origin}</strong></div>
                <div class="text-zinc-400 font-mono text-[11px]">
                  AGI ${wizState.attributes.AGI} | FOR ${wizState.attributes.FOR} | INT ${wizState.attributes.INT} | PRE ${wizState.attributes.PRE} | VIG ${wizState.attributes.VIG}
                </div>
                <div class="pt-1">
                  <span class="block text-[11px] text-zinc-400 mb-1">Perícias Treinadas (+5):</span>
                  <p class="text-[11px] font-mono text-zinc-200 leading-relaxed">${allTrained.join(', ')}</p>
                </div>
                ${wizState.charClass === 'Ocultista' ? `
                  <div class="pt-1">
                    <span class="block text-[11px] text-zinc-400 mb-1">Rituais Iniciais:</span>
                    <p class="text-[11px] font-mono accent-text">${wizState.selectedRituals.join(', ')}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }
    }

    function buildAgentFromWizard() {
      const defaultPath = Object.keys(CLASSES_DB[wizState.charClass].paths)[0];
      const ag = getDefaultState({
        name: wizState.name.trim() || 'Agente Recruta',
        player: wizState.player.trim(),
        origin: wizState.origin,
        charClass: wizState.charClass,
        path: defaultPath,
        attributes: { ...wizState.attributes },
        combatenteAttackSkill: wizState.combatenteAttack,
        combatenteDefenseSkill: wizState.combatenteDefense,
        notes: wizState.notes.trim(),
        proficiencies: wizState.charClass === 'Combatente'
          ? 'Armas Simples, Armas Táticas, Proteções Leves'
          : wizState.charClass === 'Especialista'
            ? 'Armas Simples, Proteções Leves'
            : 'Armas Simples'
      });

      const allTrained = Array.from(new Set([...getWizardLockedSkills(), ...wizState.selectedSkills]));
      allTrained.forEach(s => {
        if (ag.skills[s]) ag.skills[s].rank = 5;
      });

      if (wizState.charClass === 'Especialista') {
        ag.peritoSkills = wizState.selectedSkills.filter(s => s !== 'Luta' && s !== 'Pontaria').slice(0, 2);
      }

      if (wizState.charClass === 'Ocultista') {
        ag.rituals = wizState.selectedRituals
          .map(rName => RITUALS_COMPENDIUM.find(r => r.name === rName))
          .filter(Boolean)
          .map((r, i) => ({ id: Date.now() + i, ...r, circle: String(r.circle) }));
      }

      if (wizState.applyStarterKit) {
        ag.inventory = WIZARD_CLASS_GUIDES[wizState.charClass].starterKit.map((it, i) => ({
          id: Date.now() + 100 + i,
          ...it
        }));
      }

      const snap = computeAgentSnapshotStats(ag);
      ag.currentPv = snap.maxPv;
      ag.currentPe = snap.maxPe;
      ag.currentSan = snap.maxSan;
      return ag;
    }

    function finalizeGuidedWizard() {
      const newAgent = buildAgentFromWizard();
      rosterData.agents.unshift(newAgent);
      closeModal('modal-guided-wizard');
      openAgentSheet(newAgent.id);
      showToast('Agente Criado!', `${newAgent.name} pronto para jogar com atributos, perícias e kit configurados.`, '✨');
    }
    // ==================== INITIALIZATION ====================
    window.addEventListener('DOMContentLoaded', () => {
      initSiteTheme();
      initStaticDropdowns();
      applyViewVisibility();
      if (rosterData.view === 'hub') {
        renderHub();
      } else {
        refreshAll();
      }
    });


