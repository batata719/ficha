    // ==================== CORE CALCULATIONS ====================
    function getNexLevelIndex(nex) {
      const idx = NEX_STEPS.indexOf(nex);
      return idx >= 0 ? idx + 1 : 1;
    }

    function getAttributePointsBudget(nex) {
      let bonus = 0;
      if (nex >= 20) bonus++;
      if (nex >= 50) bonus++;
      if (nex >= 80) bonus++;
      if (nex >= 95) bonus++;
      return {
        totalSumAllowed: 9 + bonus,
        maxPerAttr: nex >= 20 ? 5 : 3
      };
    }

    function calculateMaxStats() {
      const level = getNexLevelIndex(state.nex);
      const vig = state.attributes.VIG;
      const pre = state.attributes.PRE;
      const agi = state.attributes.AGI;
      const int = state.attributes.INT;
      const forca = state.attributes.FOR;

      let basePv = 20, perLevelPv = 4;
      let basePe = 2, perLevelPe = 2;
      let baseSan = 12, perLevelSan = 3;

      if (state.charClass === 'Especialista') {
        basePv = 16; perLevelPv = 3;
        basePe = 3; perLevelPe = 3;
        baseSan = 16; perLevelSan = 4;
      } else if (state.charClass === 'Ocultista') {
        basePv = 12; perLevelPv = 2;
        basePe = 4; perLevelPe = 4;
        baseSan = 20; perLevelSan = 5;
      }

      // Origin automatic passive bonuses
      let originPvBonus = state.origin === 'Desgarrado' ? level : 0;
      let originSanBonus = state.origin === 'Vítima' ? level : 0;
      let originPeBonus = state.origin === 'Universitário' ? (1 + Math.floor(level / 2)) : 0;
      let originPeLimitBonus = state.origin === 'Universitário' ? 1 : 0;
      let originDefBonus = state.origin === 'Policial' ? 2 : 0;

      // Paranormal Powers passive bonuses
      let powerPvBonus = 0;
      let powerPeBonus = 0;
      let powerDefBonus = 0;
      state.abilities.forEach(ab => {
        if (ab.name === 'Sangue de Ferro') powerPvBonus += (level * 2);
        if (ab.name === 'Potencial Aprimorado') powerPeBonus += (level * (ab.affinity ? 2 : 1));
        if (ab.name === 'Precognição') powerDefBonus += 2;
        if (ab.name === 'Reflexos Defensivos') powerDefBonus += 2;
      });

      let maxPv = basePv + vig + ((level - 1) * (perLevelPv + vig)) + originPvBonus + powerPvBonus + (state.bonusPv || 0);
      let maxPe = basePe + pre + ((level - 1) * (perLevelPe + pre)) + originPeBonus + powerPeBonus + (state.bonusPe || 0);
      let maxSan = baseSan + ((level - 1) * perLevelSan) + originSanBonus + (state.bonusSan || 0);
      if (state.origin === 'Cultista Arrependido') maxSan = Math.floor(maxSan / 2);

      const peLimit = level + originPeLimitBonus;

      // Armor defense & heavy armor penalty
      let armorDefense = 0;
      let heavyArmorEquipped = false;
      let backpackBonus = 0;

      state.inventory.forEach(item => {
        const eff = computeItemEffectiveStats(item);
        if (item.type === 'Proteção' && item.equipped) {
          armorDefense += eff.effectiveDefense;
          if (item.name.toLowerCase().includes('pesada')) heavyArmorEquipped = true;
        }
        if (item.name.toLowerCase().includes('mochila militar')) {
          backpackBonus += 2;
        }
      });

      // Load calculation
      const isTecnico = state.charClass === 'Especialista' && state.path === 'Técnico' && state.nex >= 10;
      const loadAttr = forca + (isTecnico ? int : 0);
      const maxSpaces = Math.max(2, loadAttr * 5) + backpackBonus;
      const currentSpaces = state.inventory.reduce((acc, it) => acc + computeItemEffectiveStats(it).effectiveSpaces, 0);
      const isOverloaded = currentSpaces > maxSpaces;

      const defense = 10 + agi + armorDefense + originDefBonus + powerDefBonus + (state.defenseOther || 0) - (isOverloaded ? 5 : 0);
      const reflexBonus = (state.skills['Reflexos']?.rank || 0) + (state.skills['Reflexos']?.other || 0);
      const fortitudeBonus = (state.skills['Fortitude']?.rank || 0) + (state.skills['Fortitude']?.other || 0);

      const dodge = defense + reflexBonus;
      const blockRd = fortitudeBonus + (state.charClass === 'Combatente' && state.path === 'Tropa de Choque' && state.nex >= 10 ? vig : 0);
      const ritualDt = 10 + peLimit + pre;

      return {
        level,
        maxPv: Math.max(1, maxPv),
        maxPe: Math.max(1, maxPe),
        maxSan: Math.max(1, maxSan),
        peLimit,
        armorDefense,
        heavyArmorEquipped,
        defense,
        dodge,
        blockRd,
        ritualDt,
        maxSpaces,
        currentSpaces,
        isOverloaded
      };
    }

    // ==================== SELECTION HANDLERS ====================
    function selectOrigin(originName) {
      const prevOriginObj = ORIGINS_DB.find(o => o.name === state.origin);
      const prevOriginSkills = prevOriginObj ? prevOriginObj.skills : [];

      state.origin = originName;
      const newOriginObj = ORIGINS_DB.find(o => o.name === originName);
      const newOriginSkills = newOriginObj ? newOriginObj.skills : [];
      const classMandatory = getMandatorySkills().classSkills;

      // Cleanly remove previous origin's exclusive rank-5 grants
      prevOriginSkills.forEach(s => {
        if (!newOriginSkills.includes(s) && !classMandatory.includes(s) && state.skills[s]?.rank === 5) {
          state.skills[s].rank = 0;
        }
      });

      enforceMandatorySkills();

      if (newOriginObj && newOriginObj.skills.length > 0) {
        showToast(`Origem: ${originName}`, `Perícias ${newOriginObj.skills.join(' e ')} treinadas automaticamente!`, '+5');
      } else {
        showToast(`Origem: ${originName}`, `Você possui +2 perícias livres à escolha para treinar.`, 'Livre');
      }
      saveState();
      refreshAll();
    }

    function selectClass(className) {
      const prevMax = calculateMaxStats();
      const prevClassMandatory = getMandatorySkills().classSkills;
      const originSkills = getMandatorySkills().originSkills;

      state.charClass = className;
      const availablePaths = Object.keys(CLASSES_DB[className].paths);
      if (!availablePaths.includes(state.path)) {
        state.path = availablePaths[0];
      }

      const newClassMandatory = getMandatorySkills().classSkills;

      // Cleanly remove previous class's exclusive rank-5 grants
      prevClassMandatory.forEach(s => {
        if (!newClassMandatory.includes(s) && !originSkills.includes(s) && state.skills[s]?.rank === 5) {
          state.skills[s].rank = 0;
        }
      });

      enforceMandatorySkills();

      const newMax = calculateMaxStats();
      if (state.currentPv >= prevMax.maxPv) state.currentPv = newMax.maxPv;
      if (state.currentPe >= prevMax.maxPe) state.currentPe = newMax.maxPe;
      if (state.currentSan >= prevMax.maxSan) state.currentSan = newMax.maxSan;

      // Update default proficiencies hint if still default
      if (className === 'Combatente') state.proficiencies = 'Armas Simples, Armas Táticas, Proteções Leves';
      if (className === 'Especialista') state.proficiencies = 'Armas Simples, Proteções Leves';
      if (className === 'Ocultista') state.proficiencies = 'Armas Simples';

      saveState();
      refreshAll();
    }

    function updatePP(ppValue) {
      state.pp = Math.max(0, ppValue);
      // Automatic Patente progression by PP
      let newRank = 'Recruta';
      if (state.pp >= 200) newRank = 'Agente de Elite';
      else if (state.pp >= 100) newRank = 'Oficial de Operações';
      else if (state.pp >= 50) newRank = 'Agente Especial';
      else if (state.pp >= 20) newRank = 'Operador';

      if (newRank !== state.rank) {
        state.rank = newRank;
        showToast('Promoção de Patente!', `Com ${state.pp} PP, sua patente agora é ${newRank}.`, '★');
      }
      saveState();
      refreshAll();
    }

    function applyTheme() {
  const currentSiteTheme = document.documentElement.getAttribute('data-theme');
  if (currentSiteTheme === 'coquette') {
    document.documentElement.style.setProperty('--accent', '#ec4899');
    document.documentElement.style.setProperty('--accent-soft', 'rgba(236, 72, 153, 0.14)');
    document.documentElement.style.setProperty('--accent-border', 'rgba(236, 72, 153, 0.45)');
    return;
  }

  const theme = ELEMENT_THEMES[state.affinity] || ELEMENT_THEMES['Nenhuma'];
  document.documentElement.style.setProperty('--accent', theme.accent);
  document.documentElement.style.setProperty('--accent-soft', theme.soft);
  document.documentElement.style.setProperty('--accent-border', theme.border);
}

    function updateField(key, value) {
      const prevMax = calculateMaxStats();
      state[key] = value;

      const newMax = calculateMaxStats();
      if (['nex', 'charClass', 'origin', 'bonusPv', 'bonusPe', 'bonusSan'].includes(key)) {
        if (state.currentPv >= prevMax.maxPv) state.currentPv = newMax.maxPv;
        if (state.currentPe >= prevMax.maxPe) state.currentPe = newMax.maxPe;
        if (state.currentSan >= prevMax.maxSan) state.currentSan = newMax.maxSan;
      }

      saveState();
      refreshAll();
    }

    function adjustAttribute(attrKey, delta) {
      const currentVal = state.attributes[attrKey];
      const newVal = currentVal + delta;
      const budget = getAttributePointsBudget(state.nex);

      if (newVal < 0 || newVal > budget.maxPerAttr) return;

      const prevMax = calculateMaxStats();
      state.attributes[attrKey] = newVal;
      const nextMax = calculateMaxStats();

      if (attrKey === 'VIG') state.currentPv = Math.max(1, state.currentPv + (nextMax.maxPv - prevMax.maxPv));
      if (attrKey === 'PRE') state.currentPe = Math.max(0, state.currentPe + (nextMax.maxPe - prevMax.maxPe));

      saveState();
      refreshAll();
    }

    function adjustStat(stat, delta) {
      const stats = calculateMaxStats();
      if (stat === 'pv') state.currentPv = Math.max(0, Math.min(stats.maxPv + 100, state.currentPv + delta));
      if (stat === 'pe') state.currentPe = Math.max(0, Math.min(stats.maxPe + 50, state.currentPe + delta));
      if (stat === 'san') state.currentSan = Math.max(0, Math.min(stats.maxSan + 50, state.currentSan + delta));
      saveState();
      refreshAll();
    }

    function setStat(stat, val) {
      const num = parseInt(val) || 0;
      if (stat === 'pv') state.currentPv = Math.max(0, num);
      if (stat === 'pe') state.currentPe = Math.max(0, num);
      if (stat === 'san') state.currentSan = Math.max(0, num);
      saveState();
      refreshAll();
    }

    function fullRest() {
      const stats = calculateMaxStats();
      state.currentPv = stats.maxPv;
      state.currentPe = stats.maxPe;
      state.currentSan = stats.maxSan;
      saveState();
      refreshAll();
      showToast('Descanso Completo', 'PV, PE e Sanidade restaurados ao máximo.', '100%');
    }

