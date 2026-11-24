    const OBS_SKINS = {
      dossier: {
        id: "dossier",
        name: "🗂 Dossiê Analógico",
        desc: "Papel envelhecido, Polaroid com fita adesiva e carimbo de máquina.",
        cardClass: "skin-dossier-card",
        photoFrameClass: "skin-dossier-photo-frame",
        titleFont: "obs-font-stamp",
        monoFont: "obs-font-typewriter",
        titleColor: "#1c1815",
        subTextColor: "#574b40",
        dividerClass: "border-b border-dashed border-[#bfb29e]",
        barTrackClass: "bg-[#dfd5c5] border border-[#a89984] p-[1px]",
        pvLabelColor: "#7f1d1d",
        peLabelColor: "#92400e",
        sanLabelColor: "#1e3a8a",
        pvBar: "#991b1b",
        peBar: "#b45309",
        sanBar: "#1e40af",
        stampBoxClass: "border-2 border-[#991b1b] text-[#991b1b] bg-[#f3ede2]/95 -rotate-2",
        rollCardClass: "skin-dossier-card border-2 border-[#8b7d6b]",
        hasTape: true,
        nexInsidePolaroid: true
      },
      cris: {
        id: "cris",
        name: "📡 Terminal C.R.I.S.",
        desc: "Interface tática escura da Ordo Realitas com scanlines e HUD neon.",
        cardClass: "skin-cris-card",
        photoFrameClass: "skin-cris-photo-frame",
        titleFont: "obs-font-cris font-bold tracking-tight",
        monoFont: "obs-font-cris",
        titleColor: "#ffffff",
        subTextColor: "#a1a1aa",
        dividerClass: "border-b border-purple-500/30",
        barTrackClass: "bg-black/70 border border-zinc-700/80 rounded-sm overflow-hidden",
        pvLabelColor: "#f87171",
        peLabelColor: "#fbbf24",
        sanLabelColor: "#38bdf8",
        pvBar: "#ef4444",
        peBar: "#f59e0b",
        sanBar: "#0ea5e9",
        stampBoxClass: "border border-rose-500 bg-rose-950/90 text-rose-300 rounded px-2",
        rollCardClass: "skin-cris-card border border-purple-400/70",
        hasTape: false,
        nexInsidePolaroid: false
      },
      ritual: {
        id: "ritual",
        name: "🩸 Grimório & Sangue",
        desc: "Estética ocultista sombria com bordas carmesim e dourado ritualístico.",
        cardClass: "skin-ritual-card",
        photoFrameClass: "skin-ritual-photo-frame",
        titleFont: "obs-font-ritual font-bold tracking-wide",
        monoFont: "obs-font-cris",
        titleColor: "#fef3c7",
        subTextColor: "#d6b89c",
        dividerClass: "border-b border-amber-600/35",
        barTrackClass: "bg-[#1a0b0e] border border-[#5c1922] p-[1px]",
        pvLabelColor: "#fca5a5",
        peLabelColor: "#fcd34d",
        sanLabelColor: "#93c5fd",
        pvBar: "#dc2626",
        peBar: "#d97706",
        sanBar: "#2563eb",
        stampBoxClass: "border border-amber-400 bg-[#2b090e] text-amber-300 uppercase tracking-widest",
        rollCardClass: "skin-ritual-card border-2 border-amber-500/70",
        hasTape: false,
        nexInsidePolaroid: false
      },
      clean: {
        id: "clean",
        name: "✨ Stream Clean",
        desc: "Overlay moderno translúcido sem ruído visual, ideal para qualquer layout.",
        cardClass: "skin-clean-card",
        photoFrameClass: "skin-clean-photo-frame",
        titleFont: "obs-font-clean font-extrabold tracking-tight",
        monoFont: "obs-font-clean font-semibold",
        titleColor: "#ffffff",
        subTextColor: "#a1a1aa",
        dividerClass: "border-b border-white/10",
        barTrackClass: "bg-white/10 rounded-full overflow-hidden",
        pvLabelColor: "#fb7185",
        peLabelColor: "#fbbf24",
        sanLabelColor: "#38bdf8",
        pvBar: "#f43f5e",
        peBar: "#eab308",
        sanBar: "#0ea5e9",
        stampBoxClass: "bg-rose-600 text-white rounded-full px-2.5",
        rollCardClass: "skin-clean-card border border-white/25",
        hasTape: false,
        nexInsidePolaroid: false
      }
    };

    function compressImageDataUrl(dataUrl, maxSide = 280, quality = 0.72) {
      return new Promise((resolve) => {
        if (!dataUrl || !dataUrl.startsWith("data:image")) return resolve(dataUrl);
        const img = new Image();
        img.onload = () => {
          const ratio = Math.min(1, maxSide / Math.max(img.width, img.height));
          const w = Math.round(img.width * ratio);
          const h = Math.round(img.height * ratio);
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
      });
    }

    function encodeStandalonePayload(ag, cfg, computeVitals) {
      try {
        const vitals = computeVitals(ag);
        const isHttpUrl = (u) => typeof u === "string" && /^https?:\/\//i.test(u.trim());
        const compact = {
          id: ag.id,
          n: ag.name || "Agente",
          c: ag.charClass || "",
          p: ag.path || "",
          x: ag.nex || 5,
          a: ag.affinity || "Nenhuma",
          pv: ag.currentPv ?? vitals.maxPv,
          mpv: vitals.maxPv,
          pe: ag.currentPe ?? vitals.maxPe,
          mpe: vitals.maxPe,
          san: ag.currentSan ?? vitals.maxSan,
          msan: vitals.maxSan,
          img: isHttpUrl(cfg.avatarNormal) ? cfg.avatarNormal.trim() : "",
          imgh: isHttpUrl(cfg.avatarHurt) ? cfg.avatarHurt.trim() : "",
          imgi: isHttpUrl(cfg.avatarInsane) ? cfg.avatarInsane.trim() : "",
          imgd: isHttpUrl(cfg.avatarDying) ? cfg.avatarDying.trim() : "",
          sb: cfg.showBars !== false ? 1 : 0,
          sn: cfg.showName !== false ? 1 : 0,
          sx: cfg.showNex !== false ? 1 : 0,
          sk: cfg.skin || "dossier"
        };
        const json = JSON.stringify(compact);
        return btoa(unescape(encodeURIComponent(json)));
      } catch (e) {
        return "";
      }
    }

    function decodeStandalonePayload(encodedStr) {
      if (!encodedStr) return null;
      try {
        const json = decodeURIComponent(escape(atob(encodedStr)));
        const d = JSON.parse(json);
        return {
          agent: {
            id: d.id || "standalone_agent",
            name: d.n || "",
            charClass: d.c || "",
            path: d.p || "",
            nex: d.x || 5,
            affinity: d.a || "Nenhuma",
            currentPv: d.pv,
            _maxPv: d.mpv,
            currentPe: d.pe,
            _maxPe: d.mpe,
            currentSan: d.san,
            _maxSan: d.msan
          },
          obsCfg: {
            avatarNormal: d.img || "",
            avatarHurt: d.imgh || "",
            avatarInsane: d.imgi || "",
            avatarDying: d.imgd || "",
            showBars: d.sb !== 0,
            showName: d.sn !== 0,
            showNex: d.sx !== 0,
            skin: d.sk || "dossier"
          }
        };
      } catch (e) {
        return null;
      }
    }

