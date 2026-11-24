    // ==================== RENDER FUNCTIONS ====================
    function initStaticDropdowns() {
      document.getElementById('char-nex').innerHTML = NEX_STEPS.map(n => `<option value="${n}">${n}%</option>`).join('');
      document.getElementById('char-origin').innerHTML = ORIGINS_DB.map(o => `<option value="${o.name}">${o.name}</option>`).join('');
    }

    function renderHeader() {
      // Populate quick agent switcher in header
      const quickSelect = document.getElementById('quick-agent-select');
      if (quickSelect) {
        quickSelect.innerHTML = rosterData.agents.map(ag =>
          `<option value="${ag.id}" ${ag.id === state.id ? 'selected' : ''}>${ag.name || 'Sem Nome'} (${ag.nex}%)</option>`
        ).join('');
      }

      document.getElementById('char-name').value = state.name;
      document.getElementById('char-player').value = state.player;
      document.getElementById('char-origin').value = state.origin;
      document.getElementById('char-class').value = state.charClass;
      document.getElementById('char-rank').value = state.rank;
      document.getElementById('char-affinity').value = state.affinity;
      document.getElementById('char-nex').value = state.nex;
      document.getElementById('char-pp').value = state.pp || 0;

      const pathSelect = document.getElementById('char-path');
      const paths = Object.keys(CLASSES_DB[state.charClass].paths);
      pathSelect.innerHTML = paths.map(p => `<option value="${p}" ${state.path === p ? 'selected' : ''}>${p}</option>`).join('');
    }

    function renderAttributesAndVitals() {
      const container = document.getElementById('attributes-container');
      const budget = getAttributePointsBudget(state.nex);
      const currentSum = Object.values(state.attributes).reduce((a, b) => a + b, 0);
      const spentPoints = currentSum - 5;
      const allowedPoints = budget.totalSumAllowed - 5;

      const pill = document.getElementById('attr-points-pill');
      pill.textContent = `Pontos: ${spentPoints} / ${allowedPoints}`;
      pill.className = spentPoints === allowedPoints
        ? 'px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
        : spentPoints > allowedPoints
          ? 'px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border border-rose-500/40 bg-rose-500/10 text-rose-400'
          : 'px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border accent-border accent-soft-bg accent-text';

      container.innerHTML = ATTRIBUTE_INFO.map(attr => {
        const val = state.attributes[attr.key];
        return `
          <div class="bg-void border border-borderSubtle hover:border-zinc-600 rounded-xl p-2 flex flex-col items-center justify-between transition group">
            <button onclick="rollAttributeTest('${attr.key}', '${attr.name}')" title="Rolar ${attr.name}"
              class="text-[11px] font-bold tracking-wider text-zinc-400 group-hover:accent-text transition uppercase">
              ${attr.key}
            </button>
            <button onclick="rollAttributeTest('${attr.key}', '${attr.name}')"
              class="text-xl sm:text-2xl font-mono font-bold text-white my-1 hover:scale-110 transition">
              ${val}
            </button>
            <div class="flex items-center gap-1 w-full">
              <button onclick="adjustAttribute('${attr.key}', -1)" ${val <= 0 ? 'disabled' : ''}
                class="flex-1 py-0.5 rounded bg-elevated hover:bg-zinc-700 disabled:opacity-30 text-[11px] font-mono text-zinc-300">-</button>
              <button onclick="adjustAttribute('${attr.key}', 1)" ${val >= budget.maxPerAttr ? 'disabled' : ''}
                class="flex-1 py-0.5 rounded bg-elevated hover:bg-zinc-700 disabled:opacity-30 text-[11px] font-mono text-zinc-300">+</button>
            </div>
          </div>
        `;
      }).join('');

      const stats = calculateMaxStats();

      document.getElementById('pv-current').value = state.currentPv;
      document.getElementById('pv-max').textContent = stats.maxPv;
      document.getElementById('pv-bar').style.width = `${Math.min(100, Math.max(0, (state.currentPv / stats.maxPv) * 100))}%`;
      document.getElementById('pv-status-tag').classList.toggle('hidden', state.currentPv > Math.floor(stats.maxPv / 2));

      document.getElementById('pe-current').value = state.currentPe;
      document.getElementById('pe-max').textContent = stats.maxPe;
      document.getElementById('pe-turn-limit').textContent = stats.peLimit;
      document.getElementById('pe-bar').style.width = `${Math.min(100, Math.max(0, (state.currentPe / stats.maxPe) * 100))}%`;

      document.getElementById('san-current').value = state.currentSan;
      document.getElementById('san-max').textContent = stats.maxSan;
      document.getElementById('san-bar').style.width = `${Math.min(100, Math.max(0, (state.currentSan / stats.maxSan) * 100))}%`;
      document.getElementById('san-status-tag').classList.toggle('hidden', state.currentSan > Math.floor(stats.maxSan / 2));

      document.getElementById('defense-total').textContent = stats.defense;
      document.getElementById('overload-alert').classList.toggle('hidden', !stats.isOverloaded);
      document.getElementById('ritual-dt').textContent = stats.ritualDt;
      document.getElementById('ritual-tab-dt').textContent = stats.ritualDt;

      const effectiveSpeed = Math.max(0, (state.speed || 9) - (stats.isOverloaded ? 3 : 0));
      document.getElementById('char-speed').value = state.speed || 9;
      document.getElementById('speed-squares').textContent = `${Math.floor(effectiveSpeed / 1.5)} quad.`;

      document.getElementById('reaction-dodge').textContent = stats.dodge;
      document.getElementById('reaction-block').textContent = stats.blockRd;
      document.getElementById('defense-other').value = state.defenseOther || 0;
    }

    function renderTrainingAutomationPanel() {
      const panel = document.getElementById('training-automation-panel');
      const quota = getSkillQuotaSummary();
      const { originSkills, classSkills } = quota.mandatory;

      const trainedOk = quota.actualTrained <= quota.totalTrainedAllowed;
      const vetOk = quota.actualVeteranOrHigher <= quota.veteranSlotsAllowed;
      const expOk = quota.actualExpert <= quota.expertSlotsAllowed;

      let classInteractiveHtml = '';
      if (state.charClass === 'Combatente') {
        classInteractiveHtml = `
          <div class="flex flex-wrap items-center gap-3 pt-2 border-t border-borderSubtle/70 text-xs">
            <span class="text-zinc-400 font-medium">Escolhas Obrigatórias de Combatente:</span>
            <div class="inline-flex rounded-lg bg-surface p-0.5 border border-borderSubtle">
              <button onclick="setCombatenteChoice('attack', 'Luta')" class="px-2.5 py-1 rounded-md font-medium transition ${state.combatenteAttackSkill === 'Luta' ? 'accent-bg text-white' : 'text-zinc-400 hover:text-white'}">Luta</button>
              <button onclick="setCombatenteChoice('attack', 'Pontaria')" class="px-2.5 py-1 rounded-md font-medium transition ${state.combatenteAttackSkill === 'Pontaria' ? 'accent-bg text-white' : 'text-zinc-400 hover:text-white'}">Pontaria</button>
            </div>
            <span class="text-zinc-600">+</span>
            <div class="inline-flex rounded-lg bg-surface p-0.5 border border-borderSubtle">
              <button onclick="setCombatenteChoice('defense', 'Fortitude')" class="px-2.5 py-1 rounded-md font-medium transition ${state.combatenteDefenseSkill === 'Fortitude' ? 'accent-bg text-white' : 'text-zinc-400 hover:text-white'}">Fortitude</button>
              <button onclick="setCombatenteChoice('defense', 'Reflexos')" class="px-2.5 py-1 rounded-md font-medium transition ${state.combatenteDefenseSkill === 'Reflexos' ? 'accent-bg text-white' : 'text-zinc-400 hover:text-white'}">Reflexos</button>
            </div>
            <span class="text-zinc-500 text-[11px]">+ (${1 + state.attributes.INT} perícias livres de Classe + INT)</span>
          </div>
        `;
      } else if (state.charClass === 'Ocultista') {
        classInteractiveHtml = `
          <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-borderSubtle/70 text-xs">
            <span class="text-zinc-400 font-medium">Treinamento Automático de Ocultista:</span>
            <span class="px-2 py-0.5 rounded bg-surface border border-borderSubtle text-zinc-200 font-mono">Ocultismo (+5)</span>
            <span class="px-2 py-0.5 rounded bg-surface border border-borderSubtle text-zinc-200 font-mono">Vontade (+5)</span>
            <span class="text-zinc-500 text-[11px]">+ (${3 + state.attributes.INT} perícias livres de Classe + INT)</span>
          </div>
        `;
      } else if (state.charClass === 'Especialista') {
        const trainedCandidates = OFFICIAL_SKILLS.filter(s => (state.skills[s.name]?.rank || 0) >= 5 && s.name !== 'Luta' && s.name !== 'Pontaria');
        const peritoList = state.peritoSkills || [];
        classInteractiveHtml = `
          <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-borderSubtle/70 text-xs">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-zinc-400 font-medium">Especialista — Perito (${getPeritoDie()} por 2 PE):</span>
              <span class="text-zinc-300 font-mono">${peritoList.length ? peritoList.join(' • ') : 'Selecione até 2 perícias treinadas abaixo'}</span>
            </div>
            <div class="flex flex-wrap items-center gap-1">
              ${trainedCandidates.map(c => {
                const active = peritoList.includes(c.name);
                return `<button onclick="togglePeritoSkill('${c.name}')" class="px-2 py-0.5 rounded text-[11px] font-mono border transition ${active ? 'accent-border accent-soft-bg accent-text font-semibold' : 'bg-surface border-borderSubtle text-zinc-400 hover:text-zinc-200'}">${c.name}</button>`;
              }).join('')}
            </div>
          </div>
        `;
      }

      panel.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="text-zinc-400">Origem (<strong class="text-white">${state.origin}</strong>):</span>
            ${originSkills.length
              ? originSkills.map(s => `<span class="px-2 py-0.5 rounded accent-soft-bg accent-text border accent-border font-mono text-[11px]">${s}</span>`).join('')
              : `<span class="px-2 py-0.5 rounded bg-surface border border-borderSubtle text-zinc-300 font-mono text-[11px]">+2 Perícias Livres à Escolha</span>`
            }
          </div>

          <!-- LIVE QUOTA COUNTERS -->
          <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span class="px-2.5 py-1 rounded-lg border ${trainedOk ? 'bg-surface border-borderSubtle text-zinc-200' : 'bg-rose-950/40 border-rose-700 text-rose-300'}">
              Treinadas: <strong>${quota.actualTrained}</strong> / ${quota.totalTrainedAllowed}
            </span>
            <span class="px-2.5 py-1 rounded-lg border ${state.nex < 35 ? 'bg-surface/40 border-borderSubtle/50 text-zinc-500' : vetOk ? 'bg-surface border-borderSubtle text-sky-300' : 'bg-rose-950/40 border-rose-700 text-rose-300'}">
              Veterano (35%): <strong>${quota.actualVeteranOrHigher}</strong> / ${quota.veteranSlotsAllowed}
            </span>
            <span class="px-2.5 py-1 rounded-lg border ${state.nex < 70 ? 'bg-surface/40 border-borderSubtle/50 text-zinc-500' : expOk ? 'bg-surface border-borderSubtle text-amber-300' : 'bg-rose-950/40 border-rose-700 text-rose-300'}">
              Expert (70%): <strong>${quota.actualExpert}</strong> / ${quota.expertSlotsAllowed}
            </span>
          </div>
        </div>
        ${classInteractiveHtml}
      `;
    }

    function renderCombatAndSkills() {
      const stats = calculateMaxStats();
      enforceMandatorySkills();

      // Weapons Panel
      const weapons = state.inventory.filter(i => i.type === 'Arma');
      const wContainer = document.getElementById('combat-weapons-list');
      if (weapons.length === 0) {
        wContainer.innerHTML = `<div class="col-span-full text-center py-6 text-xs text-zinc-500 border border-dashed border-borderSubtle rounded-xl">Nenhuma arma equipada. Adicione armas no Catálogo na aba Inventário.</div>`;
      } else {
        wContainer.innerHTML = weapons.map(w => {
          const skillData = state.skills[w.skill] || { attr: 'FOR', rank: 0, other: 0 };
          const eff = computeItemEffectiveStats(w);
          const totalBonus = skillData.rank + (skillData.other || 0) + eff.attackBonus;
          const modLabels = eff.activeMods.map(m => m.name).join(', ');
          return `
            <div class="bg-void border border-borderSubtle rounded-xl p-3.5 flex flex-col justify-between gap-3">
              <div>
                <div class="flex items-center justify-between gap-2">
                  <h4 class="font-semibold text-sm text-white">${w.name} ${modLabels ? `<span class="text-xs font-normal accent-text">(${modLabels})</span>` : ''}</h4>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 shrink-0">Crit ${eff.effectiveCrit}</span>
                </div>
                <p class="text-xs text-zinc-400 font-mono mt-1">
                  Perícia: <strong class="text-zinc-200">${w.skill} (${totalBonus >= 0 ? '+' + totalBonus : totalBonus})</strong> • Dano: <strong class="accent-text">${eff.effectiveDamage}</strong>
                </p>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <button onclick="rollSkillTest('${w.skill}', '${w.name} (Ataque)', ${eff.attackBonus})" class="py-1.5 rounded-lg bg-elevated hover:bg-zinc-800 text-xs font-medium text-zinc-200 transition">
                  🎯 Atacar
                </button>
                <button onclick="rollDamageFormula('${eff.effectiveDamage}', '${w.name} (Dano)', 1)" class="py-1.5 rounded-lg accent-soft-bg hover:brightness-125 border accent-border text-xs font-medium accent-text transition">
                  💥 Dano
                </button>
                <button onclick="rollDamageFormula('${eff.effectiveDamage}', '${w.name} (CRÍTICO x${eff.critMultiplier})', ${eff.critMultiplier})" title="Rola o dano multiplicando os dados da arma por x${eff.critMultiplier}" class="py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-semibold text-amber-300 transition">
                  ⚡ Crit x${eff.critMultiplier}
                </button>
              </div>
            </div>
          `;
        }).join('');
      }

      // Render Training Automation Panel
      renderTrainingAutomationPanel();

      // Skills Table
      const search = (document.getElementById('skill-search').value || '').toLowerCase();
      const tbody = document.getElementById('skills-table-body');
      const { originSkills, classSkills } = getMandatorySkills();

      document.getElementById('origin-skills-label').textContent = state.origin;
      document.getElementById('class-skills-label').textContent = state.charClass;
      document.getElementById('armor-penalty-badge').classList.toggle('hidden', !stats.heavyArmorEquipped);

      const canVeteran = state.nex >= 35;
      const canExpert = state.nex >= 70;
      const filtered = OFFICIAL_SKILLS.filter(s => s.name.toLowerCase().includes(search));

      tbody.innerHTML = filtered.map(skill => {
        const sData = state.skills[skill.name] || { attr: skill.attr, rank: 0, other: 0 };
        const penalty = (skill.armorPenalty && stats.heavyArmorEquipped) ? -5 : 0;
        const autoPassive = getAutoSkillPassiveBonus(skill.name);
        const total = sData.rank + (parseInt(sData.other) || 0) + penalty + autoPassive;
        const isTrained = sData.rank >= 5;
        const isOriginSkill = originSkills.includes(skill.name);
        const isClassSkill = classSkills.includes(skill.name);
        const isMandatory = isOriginSkill || isClassSkill;
        const isPerito = state.charClass === 'Especialista' && (state.peritoSkills || []).includes(skill.name);

        return `
          <tr class="hover:bg-elevated/40 transition ${isTrained ? 'bg-void/40' : ''}">
            <td class="py-2.5 px-3">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="w-1.5 h-1.5 rounded-full ${isTrained ? 'accent-bg' : 'bg-zinc-700'}"></span>
                <span class="font-medium ${isTrained ? 'text-white' : 'text-zinc-300'}">${skill.name}</span>
                ${isOriginSkill ? '<span class="text-[10px] px-1.5 py-0.2 rounded accent-soft-bg accent-text font-mono">Origem</span>' : ''}
                ${isClassSkill ? '<span class="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-300 font-mono">Classe</span>' : ''}
                ${!isMandatory && isTrained ? '<span class="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">Livre/INT</span>' : ''}
                ${autoPassive > 0 ? `<span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 font-mono" title="Bônus automático de Poder">+${autoPassive} Poder</span>` : ''}
                ${isPerito ? `<span class="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 font-mono">Perito +${getPeritoDie()}</span>` : ''}
                ${skill.trainedOnly ? '<span class="text-[10px] text-amber-400/80 font-mono" title="Somente Treinada">*</span>' : ''}
                ${skill.armorPenalty ? '<span class="text-[10px] text-zinc-500 font-mono" title="Penalidade de Armadura">+</span>' : ''}
              </div>
            </td>
            <td class="py-2 px-2 text-center">
              <select onchange="updateSkill('${skill.name}', 'attr', this.value)" class="bg-void border border-borderSubtle rounded px-1.5 py-1 text-xs font-mono text-zinc-300 outline-none">
                ${ATTRIBUTE_INFO.map(a => `<option value="${a.key}" ${sData.attr === a.key ? 'selected' : ''}>${a.key}</option>`).join('')}
              </select>
            </td>
            <td class="py-2 px-2 text-center">
              <select onchange="updateSkill('${skill.name}', 'rank', parseInt(this.value))" class="bg-void border border-borderSubtle rounded px-2 py-1 text-xs text-zinc-200 outline-none">
                <option value="0" ${sData.rank === 0 ? 'selected' : ''} ${isMandatory ? 'disabled' : ''}>Destreinado (+0) ${isMandatory ? '🔒' : ''}</option>
                <option value="5" ${sData.rank === 5 ? 'selected' : ''}>Treinado (+5)</option>
                <option value="10" ${sData.rank === 10 ? 'selected' : ''} ${!canVeteran ? 'disabled' : ''}>Veterano (+10) ${!canVeteran ? '🔒 35%' : ''}</option>
                <option value="15" ${sData.rank === 15 ? 'selected' : ''} ${!canExpert ? 'disabled' : ''}>Expert (+15) ${!canExpert ? '🔒 70%' : ''}</option>
              </select>
            </td>
            <td class="py-2 px-2 text-center">
              <input type="number" value="${sData.other || 0}" onchange="updateSkill('${skill.name}', 'other', parseInt(this.value)||0)"
                class="w-12 text-center bg-void border border-borderSubtle rounded py-1 text-xs font-mono text-zinc-300 outline-none" />
            </td>
            <td class="py-2 px-2 text-center font-mono font-bold text-sm ${total > 0 ? 'text-white' : total < 0 ? 'text-rose-400' : 'text-zinc-500'}">
              ${total >= 0 ? '+' + total : total}
            </td>
            <td class="py-2 px-3 text-right">
              <button onclick="rollSkillTest('${skill.name}')" class="px-3 py-1 rounded-lg bg-elevated hover:bg-zinc-700 border border-borderSubtle text-xs font-mono text-zinc-200 transition">
                🎲 ${state.attributes[sData.attr]}d20
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    function updateSkill(skillName, prop, value) {
      if (!state.skills[skillName]) state.skills[skillName] = { attr: 'INT', rank: 0, other: 0 };
      state.skills[skillName][prop] = value;
      saveState();
      refreshAll();
    }

    function renderAbilitiesTab() {
      // 1. Origin & Class Base Cards
      const originObj = ORIGINS_DB.find(o => o.name === state.origin) || ORIGINS_DB[0];
      const classObj = CLASSES_DB[state.charClass];

      document.getElementById('auto-origin-class-cards').innerHTML = `
        <div class="bg-surface border accent-border rounded-2xl p-5 space-y-3 flex flex-col justify-between">
          <div class="space-y-2.5">
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono uppercase tracking-wider accent-text font-semibold">Origem Oficial: ${originObj.name}</span>
                <span class="text-[11px] font-mono text-zinc-400">${originObj.skills.length ? originObj.skills.join(' • ') : 'Livre'}</span>
              </div>
              <p class="text-xs text-zinc-400 italic leading-relaxed border-b border-borderSubtle/70 pb-2.5">${originObj.lore}</p>
            </div>
            <div class="space-y-1">
              <h4 class="text-sm font-bold text-white">${originObj.power}</h4>
              <p class="text-xs text-zinc-300 leading-relaxed">${originObj.desc}</p>
            </div>
          </div>
        </div>

        <div class="bg-surface border border-borderSubtle rounded-2xl p-5 space-y-3">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">Classe: ${state.charClass}</span>
              <span class="text-[11px] font-mono text-amber-300">NEX 5%</span>
            </div>
            <p class="text-xs text-zinc-400 italic leading-relaxed border-b border-borderSubtle/70 pb-2.5">${classObj.desc}</p>
          </div>
          <div class="space-y-1">
            <h4 class="text-sm font-bold text-white">${classObj.baseAbility.name}</h4>
            <p class="text-xs text-zinc-300 leading-relaxed">${classObj.baseAbility.desc}</p>
          </div>
        </div>
      `;

      // 2. Path Abilities (10%, 40%, 65%, 99%)
      const pathFeatures = classObj.paths[state.path] || [];
      document.getElementById('path-abilities-container').innerHTML = pathFeatures.map(feat => {
        const unlocked = state.nex >= feat.nex;
        return `
          <div class="bg-surface border ${unlocked ? 'border-zinc-700' : 'border-borderSubtle/40 opacity-50'} rounded-2xl p-4 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded ${unlocked ? 'accent-soft-bg accent-text border accent-border' : 'bg-void text-zinc-500'}">
                  Trilha ${state.path} • NEX ${feat.nex}%
                </span>
              </div>
              <span class="text-[11px] font-mono ${unlocked ? 'text-emerald-400' : 'text-zinc-500'}">
                ${unlocked ? '✓ Desbloqueada' : '🔒 Bloqueada'}
              </span>
            </div>
            <h4 class="font-semibold text-sm text-white">${feat.name}</h4>
            <p class="text-xs text-zinc-300 leading-relaxed">${feat.desc}</p>
          </div>
        `;
      }).join('');

      // 3. Chosen Powers
      const list = document.getElementById('abilities-list');
      if (state.abilities.length === 0) {
        list.innerHTML = `<div class="col-span-full text-center py-8 text-xs text-zinc-500 border border-dashed border-borderSubtle rounded-2xl">Nenhum poder adicional escolhido. Clique em "📖 Catálogo de Poderes" acima para adicionar.</div>`;
      } else {
        list.innerHTML = state.abilities.map(ab => `
          <div class="bg-surface border border-borderSubtle rounded-2xl p-5 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-semibold text-base text-white">${ab.name}</h4>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 border border-borderSubtle">${ab.source}</span>
                  ${ab.element && ab.element !== 'Nenhum' ? `<span class="text-[10px] font-mono px-2 py-0.5 rounded accent-soft-bg accent-text border accent-border">${ab.element}${ab.affinity ? ' ★ Afinidade' : ''}</span>` : ''}
                </div>
                <div class="flex items-center gap-2">
                  ${ab.cost ? `<span class="text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">${ab.cost}</span>` : ''}
                  <button onclick="deleteAbility(${ab.id})" class="text-zinc-500 hover:text-rose-400 text-xs px-1">✕</button>
                </div>
              </div>
              <p class="text-xs text-zinc-300 leading-relaxed mt-3 whitespace-pre-line">${ab.desc}</p>
              ${ab.affinity && ab.affinityDesc ? `<p class="text-xs accent-text mt-2 bg-void p-2 rounded-lg border accent-border">${ab.affinityDesc}</p>` : ''}
            </div>
          </div>
        `).join('');
      }
    }

    function renderRitualsTab() {
      const maxCircle = state.charClass === 'Ocultista'
        ? `${getMaxAccessibleRitualCircle()}º Círculo`
        : 'Via Transcender';
      document.getElementById('ritual-max-circle').textContent = maxCircle;
      document.getElementById('ritual-count').textContent = state.rituals.length;

      const circlePe = { '1': 1, '2': 3, '3': 6, '4': 10 };
      const container = document.getElementById('rituals-list');

      if (state.rituals.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-8 text-xs text-zinc-500 border border-dashed border-borderSubtle rounded-2xl">Seu grimório pessoal está vazio. Explore o Catálogo Oficial de Rituais logo abaixo para aprender!</div>`;
      } else {
        container.innerHTML = state.rituals.map(r => {
          const lockReason = getRitualLockReason(r.circle, r);
          const basePe = circlePe[String(r.circle)] || 1;
          const discMatch = (r.discente || '').match(/\(\+(\d+)\s*PE\)/i);
          const verdMatch = (r.verdadeira || '').match(/\(\+(\d+)\s*PE\)/i);
          const discExtra = discMatch ? parseInt(discMatch[1]) : null;
          const verdExtra = verdMatch ? parseInt(verdMatch[1]) : null;

          return `
            <div class="bg-void border border-borderSubtle rounded-2xl p-4 space-y-2.5">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h4 class="font-semibold text-sm text-white">${r.name}</h4>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded accent-soft-bg accent-text border accent-border">${r.element} ${r.circle}º</span>
                  </div>
                  <p class="text-[11px] text-zinc-400 mt-1 font-mono">${r.cast} • ${r.range} • ${r.duration}</p>
                </div>
                <div class="flex items-center gap-1.5 flex-wrap justify-end">
                  <button onclick="castRitual('${r.name}', ${basePe}, 'Padrão')" ${lockReason ? 'disabled' : ''} title="${lockReason}" class="text-[11px] font-mono px-2.5 py-1 rounded-lg ${lockReason ? 'bg-elevated text-zinc-500 cursor-not-allowed' : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30'} transition">
                    ${lockReason ? '🔒 Bloqueado' : `Padrão (-${basePe} PE)`}
                  </button>
                  ${discExtra !== null ? `
                    <button onclick="castRitual('${r.name}', ${basePe + discExtra}, 'Discente')" ${lockReason ? 'disabled' : ''} class="text-[11px] font-mono px-2 py-1 rounded-lg bg-elevated hover:bg-zinc-800 text-zinc-200 border border-borderSubtle transition">
                      Discente (-${basePe + discExtra})
                    </button>` : ''}
                  ${verdExtra !== null ? `
                    <button onclick="castRitual('${r.name}', ${basePe + verdExtra}, 'Verdadeiro')" ${lockReason ? 'disabled' : ''} class="text-[11px] font-mono px-2 py-1 rounded-lg accent-soft-bg hover:brightness-125 accent-text border accent-border transition">
                      Verdadeiro (-${basePe + verdExtra})
                    </button>` : ''}
                  <button onclick="deleteRitual(${r.id})" class="text-zinc-500 hover:text-rose-400 text-xs px-1">✕</button>
                </div>
              </div>
              ${lockReason ? `<p class="text-[11px] text-amber-300">${lockReason}</p>` : ''}
              <p class="text-xs text-zinc-300 leading-relaxed">${r.desc}</p>
              ${r.discente && r.discente !== 'Nenhum.' ? `<div class="text-[11px] bg-surface border border-borderSubtle rounded-lg p-2 text-zinc-300"><strong class="text-amber-300">Discente:</strong> ${r.discente}</div>` : ''}
              ${r.verdadeira && r.verdadeira !== 'Nenhum.' ? `<div class="text-[11px] bg-surface border border-borderSubtle rounded-lg p-2 text-zinc-300"><strong class="accent-text">Verdadeiro:</strong> ${r.verdadeira}</div>` : ''}
            </div>
          `;
        }).join('');
      }

      renderRitualCompendium();
    }

    function getMaxAccessibleRitualCircle() {
      if (state.charClass !== 'Ocultista') return 1;
      if (state.nex >= 85) return 4;
      if (state.nex >= 55) return 3;
      if (state.nex >= 25) return 2;
      return 1;
    }

    function getRitualLockReason(circle, ritual) {
      const officialRitual = typeof ritual === 'string'
        ? RITUALS_COMPENDIUM.find(item => item.name === ritual)
        : RITUALS_COMPENDIUM.find(item => item.name === ritual?.name);
      const exclusivePath = officialRitual?.exclusivePath || ritual?.exclusivePath;
      if (exclusivePath && (state.charClass !== 'Ocultista' || state.path !== exclusivePath || state.nex < 99)) {
        return `Requer a trilha ${exclusivePath} e NEX 99%.`;
      }

      if (circle <= getMaxAccessibleRitualCircle()) return '';
      if (state.charClass !== 'Ocultista') {
        return 'Agentes de outras classes só acessam rituais de 1º círculo via Transcender.';
      }

      const requiredNex = { 2: 25, 3: 55, 4: 85 }[circle];
      return `Requer NEX ${requiredNex}% para acessar este círculo.`;
    }

    function castRitual(name, peCost, form = 'Padrão') {
      const ritual = state.rituals.find(item => item.name === name)
        || RITUALS_COMPENDIUM.find(item => item.name === name);
      const lockReason = getRitualLockReason(Number(ritual?.circle) || 1, ritual || name);
      if (lockReason) {
        showToast('Ritual Bloqueado', lockReason, '🔒');
        return;
      }
      const stats = calculateMaxStats();
      if (state.currentPe < peCost) {
        showToast('PE Insuficiente!', `Você precisa de ${peCost} PE para conjurar ${name} (${form}).`, '!');
        return;
      }
      const limitWarning = peCost > stats.peLimit ? ` ⚠️ Excede Limite/Turno (${stats.peLimit} PE)!` : '';
      state.currentPe -= peCost;
      saveState();
      refreshAll();
      showToast(`Ritual (${form}): ${name}`, `Gasto de ${peCost} PE • DT ${stats.ritualDt}.${limitWarning}`, `-${peCost} PE`);
    }

    function renderRitualCompendium() {
      const search = (document.getElementById('comp-ritual-search').value || '').toLowerCase();
      const circleFilter = document.getElementById('comp-ritual-circle').value;
      const elemFilter = document.getElementById('comp-ritual-element').value;

      const filtered = RITUALS_COMPENDIUM.filter(r => {
        const matchSearch = r.name.toLowerCase().includes(search) || r.desc.toLowerCase().includes(search);
        const matchCircle = circleFilter === 'Todos' || String(r.circle) === circleFilter;
        const matchElem = elemFilter === 'Todos' || r.element === elemFilter;
        return matchSearch && matchCircle && matchElem;
      });

      const circlePe = { 1: '1 PE', 2: '3 PE', 3: '6 PE', 4: '10 PE' };
      const grid = document.getElementById('compendium-rituals-grid');

      grid.innerHTML = filtered.map((r, idx) => {
        const alreadyLearned = state.rituals.some(learned => learned.name === r.name);
        const lockReason = getRitualLockReason(r.circle, r);
        const globalIndex = RITUALS_COMPENDIUM.indexOf(r);
        return `
          <div class="bg-void border border-borderSubtle rounded-2xl p-4 flex flex-col justify-between gap-3 ${lockReason ? 'opacity-50' : ''}">
            <div class="space-y-2">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h4 class="font-semibold text-sm text-white">${r.name}</h4>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 border border-borderSubtle">${r.element} • ${r.circle}º Círculo</span>
                    <span class="text-[10px] font-mono text-amber-300">${circlePe[r.circle]}</span>
                  </div>
                  <p class="text-[10px] text-zinc-400 font-mono mt-1">
                    Execução: ${r.cast} | Alcance: ${r.range} | Alvo: ${r.target} | Duração: ${r.duration} | Resist: ${r.resist}
                  </p>
                </div>
                <button onclick="learnFromCompendium(${globalIndex})" ${(alreadyLearned || lockReason) ? 'disabled' : ''}
                  title="${lockReason}"
                  class="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${alreadyLearned ? 'bg-emerald-500/15 text-emerald-400 cursor-default' : lockReason ? 'bg-elevated text-zinc-500 cursor-not-allowed' : 'accent-bg text-white hover:brightness-110'}">
                  ${alreadyLearned ? '✓ Aprendido' : lockReason ? '🔒 Bloqueado' : '+ Aprender Ritual'}
                </button>
              </div>
              ${lockReason ? `<p class="text-[11px] text-amber-300">${lockReason}</p>` : ''}
              <p class="text-xs text-zinc-300 leading-relaxed">${r.desc}</p>
              ${r.discente && r.discente !== 'Nenhum.' ? `<p class="text-[11px] text-zinc-400"><strong class="text-amber-300">Discente:</strong> ${r.discente}</p>` : ''}
              ${r.verdadeira && r.verdadeira !== 'Nenhum.' ? `<p class="text-[11px] text-zinc-400"><strong class="accent-text">Verdadeiro:</strong> ${r.verdadeira}</p>` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    function learnFromCompendium(index) {
      const r = RITUALS_COMPENDIUM[index];
      if (!r || state.rituals.some(item => item.name === r.name)) return;
      const lockReason = getRitualLockReason(r.circle, r);
      if (lockReason) {
        showToast('Ritual Bloqueado', lockReason, '🔒');
        return;
      }
      state.rituals.push({
        id: Date.now() + Math.random(),
        ...r,
        circle: String(r.circle)
      });
      saveState();
      refreshAll();
      showToast('Ritual Transcrito', `${r.name} (${r.circle}º Círculo) adicionado ao seu grimório!`, '+1');
    }

    function renderInventoryTab() {
      const stats = calculateMaxStats();

      document.getElementById('load-current').textContent = stats.currentSpaces;
      document.getElementById('load-max').textContent = stats.maxSpaces;
      document.getElementById('load-overload-max').textContent = stats.maxSpaces * 2;
      const loadPct = Math.min(100, (stats.currentSpaces / stats.maxSpaces) * 100);
      const loadBar = document.getElementById('load-bar');
      loadBar.style.width = `${loadPct}%`;
      loadBar.className = stats.isOverloaded ? 'h-full bg-rose-500 transition-all duration-300' : 'h-full bg-emerald-500 transition-all duration-300';

      const loadBadge = document.getElementById('load-status-badge');
      loadBadge.textContent = stats.isOverloaded ? 'Sobrecarregado (-5 Def / -3m)' : 'Carga Normal';
      loadBadge.className = stats.isOverloaded
        ? 'text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-400'
        : 'text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400';

      document.getElementById('inv-rank-name').textContent = state.rank;
      const limits = PATENT_LIMITS[state.rank] || PATENT_LIMITS['Recruta'];
      const catCounts = { I: 0, II: 0, III: 0, IV: 0 };
      state.inventory.forEach(it => {
        const effCat = computeItemEffectiveStats(it).effectiveCat;
        if (catCounts[effCat] !== undefined) catCounts[effCat]++;
      });

      document.getElementById('category-limits-grid').innerHTML = ['I', 'II', 'III', 'IV'].map(cat => {
        const used = catCounts[cat];
        const max = limits[cat];
        const over = used > max;
        return `
          <div class="bg-void border ${over ? 'border-rose-500/50' : 'border-borderSubtle'} rounded-xl p-2.5 text-center">
            <span class="block text-[10px] uppercase text-zinc-500 font-semibold">Categoria ${cat}</span>
            <span class="font-mono text-lg font-bold ${over ? 'text-rose-400' : 'text-white'}">${used} <span class="text-xs font-normal text-zinc-500">/ ${max}</span></span>
          </div>
        `;
      }).join('');

      const tbody = document.getElementById('inventory-table-body');
      if (state.inventory.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-xs text-zinc-500">Mochila vazia. Adicione equipamentos no catálogo abaixo.</td></tr>`;
      } else {
        tbody.innerHTML = state.inventory.map(it => {
          const eff = computeItemEffectiveStats(it);
          const modBadges = eff.activeMods.map(m =>
            `<span class="inline-block text-[10px] font-mono px-1.5 py-0.2 rounded accent-soft-bg accent-text border accent-border mr-1">${m.name}</span>`
          ).join('');

          let details = it.desc || '-';
          if (it.type === 'Arma') {
            const atkTag = eff.attackBonus > 0 ? ` (+${eff.attackBonus} Atq)` : '';
            details = `<span class="font-mono text-zinc-200">${it.skill}${atkTag} • Dano ${eff.effectiveDamage} (${eff.effectiveCrit})</span> — ${it.desc || ''}`;
          } else if (it.type === 'Proteção') {
            details = `<span class="font-mono text-sky-300">+${eff.effectiveDefense} Defesa</span> — ${it.desc || ''}`;
          }

          return `
            <tr class="hover:bg-elevated/40 transition">
              <td class="py-2.5 px-3">
                <div class="font-medium text-white">${it.name}</div>
                ${modBadges ? `<div class="mt-1 flex flex-wrap gap-1">${modBadges}</div>` : ''}
              </td>
              <td class="py-2.5 px-2 text-center text-xs text-zinc-400">${it.type}</td>
              <td class="py-2.5 px-2 text-center font-mono text-xs ${eff.effectiveCat !== it.cat ? 'accent-text font-bold' : 'text-zinc-300'}">${eff.effectiveCat}</td>
              <td class="py-2.5 px-2 text-center font-mono text-xs text-zinc-300">${eff.effectiveSpaces}</td>
              <td class="py-2.5 px-3 text-xs text-zinc-400">${details}</td>
              <td class="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                <button onclick="openItemModsModal(${it.id})" title="Aplicar Aprimoramentos (Cruel, Certeira, Perigosa...)"
                  class="text-[11px] px-2 py-0.5 rounded bg-elevated hover:bg-zinc-700 border border-borderSubtle text-zinc-200 transition">
                  ⚙ Aprimorar${eff.activeMods.length ? ` (${eff.activeMods.length})` : ''}
                </button>
                ${it.type === 'Proteção' ? `
                  <button onclick="toggleEquipItem(${it.id})" class="text-[11px] px-2 py-0.5 rounded ${it.equipped ? 'bg-emerald-500/15 text-emerald-300' : 'bg-elevated text-zinc-400'}">
                    ${it.equipped ? 'Equipada' : 'Equipar'}
                  </button>` : ''}
                <button onclick="deleteItem(${it.id})" class="text-zinc-500 hover:text-rose-400 text-xs px-1">✕</button>
              </td>
            </tr>
          `;
        }).join('');
      }

      renderItemCompendium();
    }

    function renderItemCompendium() {
      const search = (document.getElementById('comp-item-search').value || '').toLowerCase();
      const typeFilter = document.getElementById('comp-item-type').value;
      const catFilter = document.getElementById('comp-item-cat').value;

      const filtered = ITEMS_COMPENDIUM.filter(it => {
        const matchSearch = it.name.toLowerCase().includes(search) || it.desc.toLowerCase().includes(search);
        const matchType = typeFilter === 'Todos' || it.type === typeFilter;
        const matchCat = catFilter === 'Todas' || it.cat === catFilter;
        return matchSearch && matchType && matchCat;
      });

      const grid = document.getElementById('compendium-items-grid');
      grid.innerHTML = filtered.map(it => {
        const globalIndex = ITEMS_COMPENDIUM.indexOf(it);
        let badgeStat = '';
        if (it.type === 'Arma') badgeStat = `${it.damage} (${it.crit})`;
        else if (it.type === 'Proteção') badgeStat = `+${it.defense} Def`;

        return `
          <div class="bg-void border border-borderSubtle rounded-xl p-3.5 flex flex-col justify-between gap-2.5">
            <div>
              <div class="flex items-start justify-between gap-2">
                <h4 class="font-semibold text-sm text-white">${it.name}</h4>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 shrink-0">Cat ${it.cat} • ${it.spaces} esp.</span>
              </div>
              <div class="flex items-center gap-2 mt-1 text-[11px] font-mono">
                <span class="text-zinc-400">${it.type}</span>
                ${badgeStat ? `<span class="accent-text font-semibold">• ${badgeStat}</span>` : ''}
              </div>
              <p class="text-xs text-zinc-400 mt-1.5 leading-relaxed">${it.desc}</p>
            </div>
            <button onclick="addItemFromCompendium(${globalIndex})"
              class="w-full py-1.5 rounded-lg bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs font-medium text-zinc-200 transition">
              + Adicionar ao Inventário
            </button>
          </div>
        `;
      }).join('');
    }

    function addItemFromCompendium(index) {
      const it = ITEMS_COMPENDIUM[index];
      if (!it) return;
      state.inventory.push({
        id: Date.now() + Math.random(),
        ...it,
        equipped: it.type === 'Proteção' ? true : undefined
      });
      saveState();
      refreshAll();
      showToast('Equipamento Adicionado', `${it.name} (Cat ${it.cat}) colocado no inventário.`, `+${it.spaces} esp.`);
    }

    function renderPowerCompendium() {
      const search = (document.getElementById('comp-power-search').value || '').toLowerCase();
      const catFilter = document.getElementById('comp-power-category').value;

      const filtered = POWERS_COMPENDIUM.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search) || p.req.toLowerCase().includes(search);
        const matchCat = catFilter === 'Todos' || p.category === catFilter;
        return matchSearch && matchCat;
      });

      const grid = document.getElementById('compendium-powers-grid');
      grid.innerHTML = filtered.map(p => {
        const globalIndex = POWERS_COMPENDIUM.indexOf(p);
        const isParanormal = Boolean(p.element);
        return `
          <div class="bg-void border border-borderSubtle rounded-xl p-4 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-start justify-between gap-2">
                <h4 class="font-semibold text-sm text-white">${p.name}</h4>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 border border-borderSubtle shrink-0">${p.category}</span>
              </div>
              <div class="flex items-center gap-2 mt-1 text-[10px] font-mono text-zinc-400">
                <span>Req: ${p.req}</span>
                <span>•</span>
                <span class="text-amber-300">${p.cost}</span>
              </div>
              <p class="text-xs text-zinc-300 mt-2 leading-relaxed">${p.desc}</p>
              ${p.affinityDesc ? `<p class="text-[11px] accent-text mt-1.5">${p.affinityDesc}</p>` : ''}
            </div>
            <div class="flex items-center gap-2 pt-1">
              <button onclick="addPowerFromCompendium(${globalIndex}, false)"
                class="flex-1 py-1.5 rounded-lg bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs font-medium text-zinc-200 transition">
                + Adicionar Poder
              </button>
              ${isParanormal ? `
                <button onclick="addPowerFromCompendium(${globalIndex}, true)"
                  class="px-2.5 py-1.5 rounded-lg accent-soft-bg hover:brightness-125 border accent-border text-xs font-semibold accent-text transition">
                  + c/ Afinidade
                </button>` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    function addPowerFromCompendium(index, withAffinity) {
      const p = POWERS_COMPENDIUM[index];
      if (!p) return;
      state.abilities.push({
        id: Date.now() + Math.random(),
        name: p.name,
        source: p.element ? 'Poder Paranormal' : `Poder de ${p.category}`,
        cost: p.cost,
        element: p.element || 'Nenhum',
        affinity: withAffinity,
        desc: p.desc,
        affinityDesc: p.affinityDesc || ''
      });
      saveState();
      refreshAll();
      showToast('Poder Adicionado', `${p.name}${withAffinity ? ' (com Afinidade)' : ''} adicionado à ficha!`, '+1');
    }

    function renderNotesAndTimeline() {
      document.getElementById('bonus-pv').value = state.bonusPv || 0;
      document.getElementById('bonus-pe').value = state.bonusPe || 0;
      document.getElementById('bonus-san').value = state.bonusSan || 0;
      document.getElementById('char-rd').value = state.rd || '';
      document.getElementById('char-proficiencies').value = state.proficiencies || '';
      document.getElementById('char-notes').value = state.notes || '';
      document.getElementById('char-clues').value = state.clues || '';
      document.getElementById('timeline-current-nex').textContent = `${state.nex}%`;

      const grid = document.getElementById('nex-timeline-grid');
      grid.innerHTML = NEX_STEPS.map(step => {
        const isCurrent = state.nex === step;
        const isPassed = state.nex >= step;
        return `
          <button onclick="updateField('nex', ${step})"
            class="p-2.5 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${isCurrent ? 'accent-border accent-soft-bg' : isPassed ? 'bg-void border-zinc-700' : 'bg-void/40 border-borderSubtle/50 opacity-55 hover:opacity-90'}">
            <span class="font-mono text-xs font-bold ${isCurrent ? 'accent-text' : isPassed ? 'text-white' : 'text-zinc-400'}">${step}%</span>
            <span class="text-[10px] text-zinc-400 leading-tight line-clamp-2">${NEX_MILESTONES[step] || 'Evolução'}</span>
          </button>
        `;
      }).join('');
    }

    function refreshAll() {
      applyTheme();
      renderHeader();
      renderAttributesAndVitals();
      renderCombatAndSkills();
      renderAbilitiesTab();
      renderRitualsTab();
      renderInventoryTab();
      renderNotesAndTimeline();
    }

