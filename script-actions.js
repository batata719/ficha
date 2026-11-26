    // ==================== DICE ROLLING ENGINE & SESSION LOG ====================
    const sessionRollHistory = [];

    function logSessionRoll(title, detail, result, isCrit = false, isFumble = false) {
      const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      sessionRollHistory.unshift({
        agent: state?.name || 'Agente',
        time: now,
        title,
        detail: detail.replace(/<[^>]*>/g, ''),
        result,
        isCrit,
        isFumble
      });
      if (sessionRollHistory.length > 40) sessionRollHistory.pop();
      const badge = document.getElementById('roll-history-count');
      if (badge) badge.textContent = sessionRollHistory.length;
    }

    function openRollHistoryModal() {
      const list = document.getElementById('roll-history-list');
      if (sessionRollHistory.length === 0) {
        list.innerHTML = `<div class="text-center py-8 text-xs text-zinc-500">Nenhuma rolagem registrada nesta sessão ainda.</div>`;
      } else {
        list.innerHTML = sessionRollHistory.map(item => `
          <div class="bg-void border ${item.isCrit ? 'border-amber-400/60' : item.isFumble ? 'border-rose-500/60' : 'border-borderSubtle'} rounded-xl p-3 flex items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-mono text-zinc-500">${item.time}</span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface text-zinc-300">${item.agent}</span>
                <span class="text-xs font-semibold text-white">${item.title}</span>
              </div>
              <p class="text-xs font-mono text-zinc-400 mt-1">${item.detail}</p>
            </div>
            <span class="text-lg font-mono font-bold ${item.isCrit ? 'text-amber-300' : item.isFumble ? 'text-rose-400' : 'accent-text'} shrink-0">
              ${item.result}
            </span>
          </div>
        `).join('');
      }
      openModal('modal-roll-history');
    }

    function clearRollHistory() {
      sessionRollHistory.length = 0;
      const badge = document.getElementById('roll-history-count');
      if (badge) badge.textContent = '0';
      openRollHistoryModal();
    }

    function openInterludeModal() {
      const stats = calculateMaxStats();
      document.getElementById('interlude-pe-lim').textContent = stats.peLimit;
      openModal('modal-interlude');
    }

    function applyInterludeAction(action) {
      const stats = calculateMaxStats();
      const lim = stats.peLimit;
      if (action === 'sleep_normal') {
        state.currentPv = Math.min(stats.maxPv, state.currentPv + lim);
        state.currentPe = Math.min(stats.maxPe, state.currentPe + lim);
        showToast('Interlúdio: Dormir', `Recuperou +${lim} PV e +${lim} PE.`, `+${lim}`);
      } else if (action === 'sleep_comfort') {
        const gain = lim * 2;
        state.currentPv = Math.min(stats.maxPv, state.currentPv + gain);
        state.currentPe = Math.min(stats.maxPe, state.currentPe + gain);
        showToast('Interlúdio: Confortável', `Recuperou +${gain} PV e +${gain} PE.`, `+${gain}`);
      } else if (action === 'relax') {
        state.currentSan = Math.min(stats.maxSan, state.currentSan + lim);
        showToast('Interlúdio: Relaxar', `Recuperou +${lim} de Sanidade.`, `+${lim} SAN`);
      }
      saveState();
      refreshAll();
      closeModal('modal-interlude');
    }

    function rollDie(sides) {
      return Math.floor(Math.random() * sides) + 1;
    }

    function rollAttributeTest(attrKey, attrName) {
      const attrVal = state.attributes[attrKey] || 0;
      const diceCount = attrVal <= 0 ? 2 : attrVal;
      const keepHighest = attrVal > 0;

      const rolls = [];
      for (let i = 0; i < diceCount; i++) rolls.push(rollDie(20));

      const chosen = keepHighest ? Math.max(...rolls) : Math.min(...rolls);
      const formattedRolls = rolls.map(r => r === chosen ? `<strong class="text-white underline">${r}</strong>` : r).join(', ');
      const modeText = keepHighest ? `${diceCount}d20↑` : '2d20↓';

      showToast(
        `Teste de ${attrName} (${attrKey})`,
        `${modeText}: [${formattedRolls}]`,
        chosen,
        chosen === 20,
        chosen === 1
      );
    }

    function rollSkillTest(skillName, customTitle = null, extraBonus = 0) {
      const stats = calculateMaxStats();
      const skillMeta = OFFICIAL_SKILLS.find(s => s.name === skillName);
      const sData = state.skills[skillName] || { attr: 'INT', rank: 0, other: 0 };
      const attrVal = state.attributes[sData.attr] || 0;
      const penalty = (skillMeta?.armorPenalty && stats.heavyArmorEquipped) ? -5 : 0;
      const autoPassive = getAutoSkillPassiveBonus(skillName);
      const bonus = sData.rank + (parseInt(sData.other) || 0) + penalty + autoPassive + (parseInt(extraBonus) || 0);

      const diceCount = attrVal <= 0 ? 2 : attrVal;
      const keepHighest = attrVal > 0;

      const rolls = [];
      for (let i = 0; i < diceCount; i++) rolls.push(rollDie(20));

      const chosen = keepHighest ? Math.max(...rolls) : Math.min(...rolls);
      const total = chosen + bonus;
      const formattedRolls = rolls.map(r => r === chosen ? `<strong class="text-white underline">${r}</strong>` : r).join(', ');
      const modeText = keepHighest ? `${diceCount}d20↑` : '2d20↓';
      const sign = bonus >= 0 ? `+${bonus}` : `${bonus}`;

      showToast(
        customTitle || `Perícia: ${skillName} (${sData.attr})`,
        `${modeText}: [${formattedRolls}] → ${chosen} ${sign}`,
        total,
        chosen === 20,
        chosen === 1
      );
    }

    function rollDamageFormula(formula, label, critMult = 1) {
      rollCustomFormula(formula, label, critMult);
    }

    function rollCustomFormula(formula, label = 'Rolagem de Dados', critMult = 1) {
      try {
        const clean = formula.replace(/\s+/g, '').toLowerCase();
        const match = clean.match(/^(\d+)d(\d+)([+-]\d+)?$/);
        if (!match) {
          showToast(label, `Fórmula inválida: ${formula}`, '!');
          return;
        }
        const baseCount = parseInt(match[1]);
        const count = Math.min(80, baseCount * Math.max(1, critMult));
        const sides = parseInt(match[2]);
        const mod = match[3] ? parseInt(match[3]) : 0;

        const rolls = [];
        for (let i = 0; i < count; i++) rolls.push(rollDie(sides));
        const sum = rolls.reduce((a, b) => a + b, 0) + mod;
        const modStr = mod !== 0 ? (mod > 0 ? ` + ${mod}` : ` - ${Math.abs(mod)}`) : '';

        showToast(label, `${count}d${sides}: [${rolls.join(', ')}]${modStr}`, sum, critMult > 1);
      } catch (e) {
        showToast(label, 'Erro ao processar rolagem', '!');
      }
    }

    function showToast(title, detail, result, isCrit = false, isFumble = false) {
      logSessionRoll(title, detail, result, isCrit, isFumble);
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      const borderClass = isCrit ? 'border-amber-400' : isFumble ? 'border-rose-500' : 'accent-border';
      const numClass = isCrit ? 'text-amber-300' : isFumble ? 'text-rose-400' : 'accent-text';

      toast.className = `toast-enter pointer-events-auto bg-elevated border ${borderClass} rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4`;
      toast.innerHTML = `
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-semibold text-white">${title}</span>
            ${isCrit ? '<span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300">20 NATURAL!</span>' : ''}
            ${isFumble ? '<span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">DESASTRE (1)</span>' : ''}
          </div>
          <p class="text-xs font-mono text-zinc-400 mt-1">${detail}</p>
        </div>
        <div class="text-2xl font-mono font-bold ${numClass} pl-3 border-l border-borderSubtle">
          ${result}
        </div>
      `;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 250);
      }, 5000);
    }

    // ==================== NAVIGATION & MODALS ====================
    function switchTab(tabName) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('tab-active');
        btn.classList.add('text-zinc-400');
      });

      document.getElementById(`tab-${tabName}`).classList.remove('hidden');
      const activeBtn = document.getElementById(`tab-btn-${tabName}`);
      activeBtn.classList.add('tab-active');
      activeBtn.classList.remove('text-zinc-400');
    }

    function openModal(id) {
      const el = document.getElementById(id);
      el.classList.remove('hidden');
      el.classList.add('flex');
    }

    function closeModal(id) {
      const el = document.getElementById(id);
      el.classList.add('hidden');
      el.classList.remove('flex');
    }

    function openCompendiumModal(type) {
      if (type === 'poderes') {
        renderPowerCompendium();
        openModal('modal-poderes');
      }
    }

    function openAbilityModal() { openModal('modal-ability'); }
    function openRitualModal() { openModal('modal-ritual'); }
    function openItemModal() { toggleItemFields(); openModal('modal-item'); }
    function openDiceModal() { openModal('modal-dice'); }

    // ==================== CUSTOM CRUD ====================
    function saveAbility() {
      const name = document.getElementById('ab-name').value.trim();
      if (!name) return;

      state.abilities.push({
        id: Date.now(),
        name,
        source: document.getElementById('ab-source').value,
        cost: document.getElementById('ab-cost').value.trim(),
        element: document.getElementById('ab-element').value,
        affinity: document.getElementById('ab-affinity').checked,
        desc: document.getElementById('ab-desc').value.trim()
      });

      document.getElementById('ab-name').value = '';
      document.getElementById('ab-cost').value = '';
      document.getElementById('ab-desc').value = '';
      closeModal('modal-ability');
      saveState();
      refreshAll();
    }

    function deleteAbility(id) {
      state.abilities = state.abilities.filter(a => a.id !== id);
      saveState();
      refreshAll();
    }

    function saveRitual() {
      const name = document.getElementById('rit-name').value.trim();
      if (!name) return;
      const circle = parseInt(document.getElementById('rit-circle').value, 10);
      const lockReason = getRitualLockReason(circle, name);
      if (lockReason) {
        showToast('Ritual Bloqueado', lockReason, '🔒');
        return;
      }

      state.rituals.push({
        id: Date.now(),
        name,
        circle: String(circle),
        element: document.getElementById('rit-element').value,
        cast: document.getElementById('rit-cast').value,
        range: document.getElementById('rit-range').value,
        duration: document.getElementById('rit-duration').value,
        target: document.getElementById('rit-target').value,
        resist: document.getElementById('rit-resist').value,
        desc: document.getElementById('rit-desc').value.trim(),
        discente: document.getElementById('rit-discente').value.trim(),
        verdadeira: document.getElementById('rit-verdadeira').value.trim()
      });

      document.getElementById('rit-name').value = '';
      document.getElementById('rit-desc').value = '';
      document.getElementById('rit-discente').value = '';
      document.getElementById('rit-verdadeira').value = '';
      closeModal('modal-ritual');
      saveState();
      refreshAll();
    }

    function deleteRitual(id) {
      state.rituals = state.rituals.filter(r => r.id !== id);
      saveState();
      refreshAll();
    }

    function toggleItemFields() {
      const type = document.getElementById('it-type').value;
      const wFields = document.getElementById('it-weapon-fields');
      const aFields = document.getElementById('it-armor-fields');

      wFields.classList.toggle('hidden', type !== 'Arma');
      wFields.classList.toggle('grid', type === 'Arma');

      aFields.classList.toggle('hidden', type !== 'Proteção');
      aFields.classList.toggle('grid', type === 'Proteção');
    }

    function saveItem() {
      const name = document.getElementById('it-name').value.trim();
      if (!name) return;

      const type = document.getElementById('it-type').value;
      const item = {
        id: Date.now(),
        name,
        type,
        cat: document.getElementById('it-cat').value,
        spaces: parseFloat(document.getElementById('it-spaces').value) || 0,
        desc: document.getElementById('it-desc').value.trim()
      };

      if (type === 'Arma') {
        item.skill = document.getElementById('it-skill').value;
        item.damage = document.getElementById('it-damage').value.trim() || '1d6';
        item.crit = document.getElementById('it-crit').value.trim() || '20/x2';
        ensureWeaponAmmoFields(item);
      } else if (type === 'Proteção') {
        item.defense = parseInt(document.getElementById('it-defense').value) || 0;
        item.equipped = document.getElementById('it-equipped').checked;
      }

      state.inventory.push(item);
      document.getElementById('it-name').value = '';
      document.getElementById('it-desc').value = '';
      closeModal('modal-item');
      saveState();
      refreshAll();
    }
    function toggleEquipItem(id) {
      const item = state.inventory.find(i => i.id === id);
      if (!item) return;

      if (item.type === 'Arma') {
        const willEquip = !item.equipped;
        // Garante apenas uma arma principal "Em Uso" no OBS por vez
        if (willEquip) {
          state.inventory.forEach(i => {
            if (i.type === 'Arma') i.equipped = false;
          });
        }
        item.equipped = willEquip;
      } else {
        item.equipped = !item.equipped;
      }
      saveState();
      refreshAll();
    }

    function adjustWeaponAmmo(id, delta) {
      const item = state.inventory.find(i => i.id === id);
      if (!item) return;
      ensureWeaponAmmoFields(item);
      item.ammoCurrent = Math.max(0, Math.min(item.ammoMax, (item.ammoCurrent || 0) + delta));
      saveState();
      refreshAll();
    }

    function reloadWeaponAmmo(id) {
      const item = state.inventory.find(i => i.id === id);
      if (!item) return;
      ensureWeaponAmmoFields(item);

      if (item.ammoCurrent >= item.ammoMax) {
        showToast(`${item.name} Já Está Carregada`, `Munição atual: ${item.ammoCurrent}/${item.ammoMax}.`, '🔄');
        return;
      }

      const supply = getWeaponAmmoSupply(item);
      let consumedSupplyName = '';
      if (supply) {
        const supplyIndex = state.inventory.findIndex(inventoryItem =>
          inventoryItem.type === 'Munição/Explosivo'
          && (inventoryItem.name || '').toLowerCase().includes(supply.name.toLowerCase())
        );
        if (supplyIndex < 0) {
          showToast('Sem Munição no Inventário', `Adicione ${supply.name} para recarregar ${item.name}.`, '⚠️', false, true);
          return;
        }
        if (!supply.reusable) {
          consumedSupplyName = state.inventory[supplyIndex].name;
          state.inventory.splice(supplyIndex, 1);
        }
      }

      item.ammoCurrent = item.ammoMax;
      saveState();
      refreshAll();
      const supplyDetail = consumedSupplyName ? ` ${consumedSupplyName} descartado do inventário.` : '';
      showToast(`${item.name} Recarregada`, `Munição restaurada para ${item.ammoCurrent}/${item.ammoMax}.${supplyDetail}`, '🔄');
    }

    function setWeaponAmmoMax(id, newMaxVal) {
      const item = state.inventory.find(i => i.id === id);
      if (!item) return;
      const parsed = Math.max(1, parseInt(newMaxVal) || 1);
      item.ammoMax = parsed;
      if (typeof item.ammoCurrent !== 'number' || item.ammoCurrent > parsed) {
        item.ammoCurrent = parsed;
      }
      saveState();
      refreshAll();
    }

    function attackWithWeapon(id, skillName, weaponName, attackBonus) {
      const item = state.inventory.find(i => i.id === id);
      if (item && weaponRequiresAmmo(item)) {
        ensureWeaponAmmoFields(item);
        if (item.ammoCurrent <= 0) {
          showToast(`${weaponName} Sem Munição!`, 'Clique em Recarregar antes de disparar.', '⚠️', false, true);
          return;
        }
        item.ammoCurrent = Math.max(0, item.ammoCurrent - 1);
        saveState();
        refreshAll();
      }
      rollSkillTest(skillName, `${weaponName} (Ataque)`, attackBonus);
    }

    function deleteItem(id) {
      state.inventory = state.inventory.filter(i => i.id !== id);
      saveState();
      refreshAll();
    }

    let currentModItemId = null;
    function openItemModsModal(itemId) {
      currentModItemId = itemId;
      renderItemModsModal();
      openModal('modal-item-mods');
    }

    function renderItemModsModal() {
      const item = state.inventory.find(i => i.id === currentModItemId);
      if (!item) return;

      if (!Array.isArray(item.mods)) item.mods = [];
      const eff = computeItemEffectiveStats(item);

      document.getElementById('mod-modal-item-name').textContent = item.name;

      let statSnippet = '';
      if (item.type === 'Arma') {
        statSnippet = `<span>Dano: <strong class="text-white">${eff.effectiveDamage}</strong></span> • <span>Crítico: <strong class="text-white">${eff.effectiveCrit}</strong></span>${eff.attackBonus ? ` • <span class="text-emerald-400">+${eff.attackBonus} Ataque</span>` : ''}`;
      } else if (item.type === 'Proteção') {
        statSnippet = `<span>Defesa: <strong class="text-sky-300">+${eff.effectiveDefense}</strong></span>`;
      }

      document.getElementById('mod-modal-summary').innerHTML = `
        <div class="flex items-center gap-3 flex-wrap">
          <span>Categoria: <strong class="text-zinc-400">${item.cat}</strong> → <strong class="accent-text">${eff.effectiveCat}</strong></span>
          <span>Espaços: <strong class="text-white">${eff.effectiveSpaces}</strong></span>
          ${statSnippet}
        </div>
        <span class="text-zinc-400">${item.mods.length} modificação(ões)</span>
      `;

      const relevantMods = ITEM_MODIFICATIONS_DB.filter(m =>
        m.target === item.type || (item.type !== 'Arma' && item.type !== 'Proteção' && m.target === 'Geral')
      );
      const displayMods = relevantMods.length > 0 ? relevantMods : ITEM_MODIFICATIONS_DB;

      document.getElementById('mod-modal-list').innerHTML = displayMods.map(mod => {
        const isApplied = item.mods.includes(mod.id);
        return `
          <div onclick="toggleItemModification('${mod.id}')"
            class="cursor-pointer rounded-xl p-3 border transition flex flex-col justify-between gap-1.5 ${isApplied ? 'accent-border accent-soft-bg' : 'bg-void border-borderSubtle hover:border-zinc-600'}">
            <div class="flex items-center justify-between gap-2">
              <span class="font-semibold text-sm ${isApplied ? 'text-white' : 'text-zinc-200'}">${mod.name}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded ${isApplied ? 'accent-bg text-white font-bold' : 'bg-elevated text-zinc-400'}">
                ${isApplied ? '✓ Aplicado (+I)' : '+ Aplicar (+I)'}
              </span>
            </div>
            <p class="text-xs text-zinc-400 leading-relaxed">${mod.desc}</p>
          </div>
        `;
      }).join('');
    }

    function toggleItemModification(modId) {
      const item = state.inventory.find(i => i.id === currentModItemId);
      if (!item) return;
      if (!Array.isArray(item.mods)) item.mods = [];

      const idx = item.mods.indexOf(modId);
      if (idx >= 0) {
        item.mods.splice(idx, 1);
      } else {
        item.mods.push(modId);
      }

      saveState();
      renderItemModsModal();
      refreshAll();
    }

    // ==================== IMPORT / EXPORT / RESET ====================
    function encodeAgentForShare(agent) {
      const bytes = new TextEncoder().encode(JSON.stringify(agent));
      let binary = '';
      for (let offset = 0; offset < bytes.length; offset += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
      }
      return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    async function shareAgentById(agentId) {
      let target = rosterData.agents.find(agent => agent.id === agentId);
      if (!target) {
        showToast('Agente Não Encontrado', 'Não foi possível gerar um link para esta ficha.', 'ERRO');
        return;
      }
      if (state.id === agentId) {
        saveState();
        target = rosterData.agents.find(agent => agent.id === agentId);
      }

      const shareUrl = new URL(window.location.href);
      shareUrl.hash = `agente=${encodeAgentForShare(target)}`;

      try {
        await navigator.clipboard.writeText(shareUrl.href);
      } catch {
        try {
          const copyField = document.createElement('textarea');
          copyField.value = shareUrl.href;
          copyField.setAttribute('readonly', '');
          copyField.style.position = 'fixed';
          copyField.style.opacity = '0';
          document.body.appendChild(copyField);
          let copied;
          try {
            copyField.select();
            copied = document.execCommand('copy');
          } finally {
            copyField.remove();
          }
          if (!copied) throw new Error('O navegador recusou a cópia do link.');
        } catch (error) {
          console.error('Erro ao copiar link do agente:', error);
          showToast('Erro ao Compartilhar', 'Não foi possível copiar o link. Verifique a permissão da área de transferência.', 'ERRO');
          return;
        }
      }

      showToast('Link Copiado', `Link da ficha de ${target.name || 'agente'} pronto para compartilhar.`, '🔗');
    }

    function importAgentFromShareLink() {
      const encodedAgent = new URLSearchParams(window.location.hash.slice(1)).get('agente');
      if (!encodedAgent) return false;

      try {
        const base64 = encodedAgent.replace(/-/g, '+').replace(/_/g, '/');
        const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
        const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
        const sharedAgent = JSON.parse(new TextDecoder().decode(bytes));
        if (!sharedAgent || typeof sharedAgent !== 'object' || Array.isArray(sharedAgent)) {
          throw new Error('Conteúdo da ficha inválido.');
        }

        const importedAgent = getDefaultState({
          ...sharedAgent,
          id: generateAgentId(),
          updatedAt: Date.now()
        });
        const importedRoster = {
          ...rosterData,
          agents: [importedAgent, ...rosterData.agents],
          activeId: importedAgent.id,
          view: 'sheet'
        };
        localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(importedRoster));
        rosterData = importedRoster;
        state = importedAgent;
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        showToast('Ficha Importada', `Agente "${importedAgent.name || 'Sem Nome'}" adicionado ao arquivo.`, '🔗');
        return true;
      } catch (error) {
        console.error('Erro ao importar agente pelo link:', error);
        showToast('Link Inválido', 'Não foi possível importar a ficha compartilhada.', 'ERRO');
        return false;
      }
    }

    function exportSingleAgentById(agentId) {
      const target = rosterData.agents.find(a => a.id === agentId);
      if (!target) return;
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(target, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute("href", dataStr);
      const safeName = (target.name || 'agente_ordem').toLowerCase().replace(/[^a-z0-9]/g, '_');
      dlAnchor.setAttribute("download", `${safeName}_nex${target.nex}.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('Exportação Concluída', `Ficha de ${target.name} baixada em JSON.`, 'JSON');
    }

    function exportJSON() {
      saveState();
      exportSingleAgentById(state.id);
    }

    function exportAllAgentsJSON() {
      const payload = {
        type: 'ordo_realitas_roster_backup',
        exportedAt: new Date().toISOString(),
        agents: rosterData.agents
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", `arquivo_ordo_realitas_${rosterData.agents.length}_agentes.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('Backup Geral Concluído', `${rosterData.agents.length} ficha(s) exportada(s) em um único arquivo.`, '📦');
    }

    function importJSON(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const imported = JSON.parse(e.target.result);

          // Multi-agent roster backup file
          if (imported && Array.isArray(imported.agents)) {
            let count = 0;
            imported.agents.forEach(ag => {
              const cleanAg = getDefaultState({
                ...ag,
                id: generateAgentId(),
                updatedAt: Date.now()
              });
              rosterData.agents.unshift(cleanAg);
              count++;
            });
            localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
            if (rosterData.view === 'hub') renderHub();
            else refreshAll();
            showToast('Backup Importado', `${count} agente(s) adicionado(s) ao Arquivo sem sobrescrever existentes.`, 'OK');
          } else {
            // Single agent JSON file
            const importedAgent = getDefaultState({
              ...imported,
              id: generateAgentId(),
              updatedAt: Date.now()
            });
            rosterData.agents.unshift(importedAgent);
            rosterData.activeId = importedAgent.id;
            state = importedAgent;
            localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));

            if (rosterData.view === 'hub') {
              renderHub();
            } else {
              refreshAll();
            }
            showToast('Ficha Importada', `Agente "${importedAgent.name || 'Sem Nome'}" adicionado ao arquivo.`, 'OK');
          }
        } catch (err) {
          showToast('Erro na Importação', 'Arquivo JSON inválido.', 'ERRO');
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    }

    let resetConfirmPending = false;
    function confirmReset() {
      if (!resetConfirmPending) {
        resetConfirmPending = true;
        showToast('Confirmar Reset?', 'Clique novamente em "Resetar" em até 4 segundos para zerar esta ficha.', '!');
        setTimeout(() => { resetConfirmPending = false; }, 4000);
      } else {
        resetConfirmPending = false;
        const keepId = state.id;
        const keepName = state.name;
        state = getDefaultState({ id: keepId, name: keepName });
        saveState();
        refreshAll();
        showToast('Ficha Resetada', 'Todos os campos desta ficha voltaram aos valores iniciais.', '5%');
      }
    }
// ==================== MOBILE-FIRST HELPERS ====================
    function initMobileUtilityBarAutoHide() {
      const utilityBar = document.querySelector('.site-utility-bar');
      if (!utilityBar) return;

      const mobileViewport = window.matchMedia('(max-width: 767px)');
      let previousScrollY = window.scrollY;
      let scrollDirection = 0;
      let scrollDistance = 0;
      let framePending = false;

      const setHidden = (hidden) => {
        utilityBar.classList.toggle('is-scroll-hidden', hidden);
        document.body.classList.toggle('mobile-utility-hidden', hidden);
      };

      const handleScroll = () => {
        if (framePending) return;
        framePending = true;
        window.requestAnimationFrame(() => {
          framePending = false;
          const currentScrollY = Math.max(0, window.scrollY);
          if (!mobileViewport.matches) {
            setHidden(false);
            previousScrollY = currentScrollY;
            return;
          }

          const delta = currentScrollY - previousScrollY;
          previousScrollY = currentScrollY;
          if (currentScrollY <= 32) {
            setHidden(false);
            scrollDirection = 0;
            scrollDistance = 0;
            return;
          }
          if (delta === 0) return;

          const nextDirection = Math.sign(delta);
          if (nextDirection !== scrollDirection) {
            scrollDirection = nextDirection;
            scrollDistance = 0;
          }
          scrollDistance += Math.abs(delta);

          if (scrollDirection > 0 && scrollDistance >= 12) setHidden(true);
          if (scrollDirection < 0 && scrollDistance >= 8) setHidden(false);
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      mobileViewport.addEventListener('change', () => {
        setHidden(false);
        previousScrollY = window.scrollY;
        scrollDirection = 0;
        scrollDistance = 0;
      });
    }

    function toggleMobileHeaderFields() {
      const fields = document.getElementById('header-identity-fields');
      const btn = document.getElementById('btn-toggle-mob-header');
      if (!fields || !btn) return;
      const isHidden = fields.classList.contains('hidden');
      fields.classList.toggle('hidden', !isHidden);
      fields.classList.toggle('grid', isHidden);
      btn.textContent = isHidden ? 'Fechar ▲' : 'Editar ▾';
    }

    // Estende applyViewVisibility para mostrar/esconder a barra inferior mobile
    const _origApplyViewVisibility = applyViewVisibility;
    applyViewVisibility = function () {
      _origApplyViewVisibility();
      const mobNav = document.getElementById('mobile-bottom-nav');
      if (mobNav) {
        mobNav.classList.toggle('hidden', rosterData.view === 'hub');
      }
    };

    // Estende switchTab para sincronizar o estado ativo nos botões inferiores
    const _origSwitchTab = switchTab;
    switchTab = function (tabName) {
      _origSwitchTab(tabName);
      document.querySelectorAll('.mob-tab-btn').forEach(btn => {
        btn.classList.remove('accent-text', 'font-semibold', 'accent-soft-bg');
        btn.classList.add('text-zinc-400');
      });
      const activeMobBtn = document.getElementById(`mob-tab-btn-${tabName}`);
      if (activeMobBtn) {
        activeMobBtn.classList.add('accent-text', 'font-semibold', 'accent-soft-bg');
        activeMobBtn.classList.remove('text-zinc-400');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Estende renderHeader para atualizar o resumo compacto no topo do celular
    const _origRenderHeader = renderHeader;
    renderHeader = function () {
      _origRenderHeader();
      const mName = document.getElementById('mob-header-name');
      const mNex = document.getElementById('mob-header-nex');
      const mSub = document.getElementById('mob-header-sub');
      if (mName) mName.textContent = state.name || 'Agente Sem Nome';
      if (mNex) mNex.textContent = `NEX ${state.nex}%`;
      if (mSub) mSub.textContent = `${state.charClass} • ${state.path} • ${state.origin}`;
    };
    // ==================== SITE THEME SYSTEM ====================
    const SITE_THEME_KEY = 'op_site_theme_v1';

    function setSiteTheme(themeName) {
  const validThemes = ['dark', 'light', 'dossier', 'cris', 'coquette'];
  const chosen = validThemes.includes(themeName) ? themeName : 'dark';

  document.documentElement.setAttribute('data-theme', chosen);

  if (chosen === 'light' || chosen === 'dossier' || chosen === 'coquette') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }

  localStorage.setItem(SITE_THEME_KEY, chosen);

  const selectEl = document.getElementById('site-theme-select');
  if (selectEl) selectEl.value = chosen;

  if (typeof applyTheme === 'function') applyTheme();
}

    function initSiteTheme() {
      const saved = localStorage.getItem(SITE_THEME_KEY);
      if (saved) {
        setSiteTheme(saved);
      } else {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        setSiteTheme(prefersLight ? 'light' : 'dark');
      }
    }
