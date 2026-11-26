// Set this to a same-origin PDF path or a publicly accessible PDF URL.
const RULEBOOK_PDF_URL = './OPRPGGREDUZIDO.pdf';
const RULEBOOK_RESULT_WINDOW = 200;
// This PDF has nine preliminary pages before the book's printed page numbering.
const RULEBOOK_PRINTED_PAGE_OFFSET = 9;

const rulebookState = {
  document: null,
  pages: [],
  loadPromise: null,
  hits: [],
  activeHit: -1,
  page: 1,
  zoom: 1,
  renderTask: null,
  renderId: 0,
  previousFocus: null
};

const rulebookElements = {
  modal: document.getElementById('modal-rulebook'),
  close: document.getElementById('rulebook-close'),
  searchForm: document.getElementById('rulebook-search-form'),
  searchInput: document.getElementById('rulebook-search-input'),
  status: document.getElementById('rulebook-status'),
  results: document.getElementById('rulebook-results-list'),
  occurrenceCount: document.getElementById('rulebook-occurrence-count'),
  previousResult: document.getElementById('rulebook-prev-result'),
  nextResult: document.getElementById('rulebook-next-result'),
  previousPage: document.getElementById('rulebook-prev-page'),
  nextPage: document.getElementById('rulebook-next-page'),
  pageInput: document.getElementById('rulebook-page-input'),
  pageCount: document.getElementById('rulebook-page-count'),
  zoomOut: document.getElementById('rulebook-zoom-out'),
  zoomIn: document.getElementById('rulebook-zoom-in'),
  zoomLabel: document.getElementById('rulebook-zoom-label'),
  pageScroller: document.getElementById('rulebook-page-scroller'),
  pageWrap: document.getElementById('rulebook-page-wrap'),
  home: document.getElementById('rulebook-home'),
  contents: document.getElementById('rulebook-contents-list'),
  contentsDescription: document.getElementById('rulebook-contents-description'),
  showContents: document.getElementById('rulebook-show-contents')
};

function openRulebook() {
  const { modal } = rulebookElements;
  if (!modal.classList.contains('hidden')) return;
  rulebookState.previousFocus = document.activeElement;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.dataset.rulebookPreviousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  rulebookElements.searchInput.focus();
  loadRulebook();
}

function closeRulebook() {
  const { modal } = rulebookElements;
  if (modal.classList.contains('hidden')) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = document.body.dataset.rulebookPreviousOverflow || '';
  delete document.body.dataset.rulebookPreviousOverflow;
  if (rulebookState.previousFocus instanceof HTMLElement) rulebookState.previousFocus.focus();
}

function setRulebookStatus(message, state = '') {
  rulebookElements.status.textContent = message;
  rulebookElements.status.classList.toggle('is-loading', state === 'loading');
  rulebookElements.status.classList.toggle('is-error', state === 'error');
}

async function loadRulebook() {
  if (rulebookState.document) return;
  if (rulebookState.loadPromise) return rulebookState.loadPromise;
  if (!window.pdfjsLib) {
    setRulebookStatus('Não foi possível carregar o PDF.js. Verifique sua conexão e recarregue a página.', 'error');
    return;
  }

  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  setRulebookStatus('Carregando o PDF...', 'loading');
  rulebookState.loadPromise = (async () => {
    try {
      const loadingTask = window.pdfjsLib.getDocument(RULEBOOK_PDF_URL);
      const pdf = await loadingTask.promise;
      rulebookState.document = pdf;
      rulebookElements.pageCount.textContent = `/ ${pdf.numPages}`;
      rulebookElements.pageInput.max = String(pdf.numPages);
      setRulebookStatus(`Indexando páginas: 0 / ${pdf.numPages}`, 'loading');

      const pages = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        let text = '';
        const items = [];
        for (const item of content.items) {
          if (typeof item.str !== 'string' || !item.str) continue;
          if (text) text += ' ';
          const start = text.length;
          text += item.str;
          items.push({ start, end: text.length, text: item.str, transform: item.transform, width: item.width });
        }
        pages.push({ text, items, normalized: normalizeSearchText(text) });
        setRulebookStatus(`Indexando páginas: ${pageNumber} / ${pdf.numPages}`, 'loading');
      }

      rulebookState.pages = pages;
      await buildRulebookContents(pdf, pages);
      rulebookElements.pageInput.disabled = false;
      rulebookElements.zoomIn.disabled = false;
      rulebookElements.zoomOut.disabled = false;
      rulebookElements.previousPage.disabled = false;
      rulebookElements.nextPage.disabled = false;
      setRulebookStatus(`Livro pronto para consulta · ${pdf.numPages} páginas`);
      showRulebookContents();
    } catch (error) {
      rulebookState.document = null;
      rulebookState.pages = [];
      rulebookState.loadPromise = null;
      setRulebookStatus(`Falha ao carregar o livro: ${error.message || 'erro desconhecido'}`, 'error');
    }
  })();
  return rulebookState.loadPromise;
}

async function buildRulebookContents(pdf, pages = []) {
  if (!pages.length) return false;
  const entries = extractPrintedContents(pages);
  const fromPrintedContents = entries.length > 0;
  if (fromPrintedContents) {
    entries.forEach(entry => {
      entry.pdfPage = resolvePrintedPage(entry, pages)
        || entry.page + RULEBOOK_PRINTED_PAGE_OFFSET;
    });
  } else {
    const outline = await pdf.getOutline();
    if (outline?.length) {
      const collect = async (items, depth = 0) => {
        for (const item of items) {
          let destination = item.dest;
          if (typeof destination === 'string') destination = await pdf.getDestination(destination);
          if (Array.isArray(destination) && destination[0]) {
            const page = await pdf.getPageIndex(destination[0]) + 1;
            entries.push({ title: item.title, page, pdfPage: page, depth });
          }
          if (item.items?.length) await collect(item.items, depth + 1);
        }
      };
      await collect(outline);
    }
  }

  if (!entries.length) {
    pages.forEach((page, index) => {
      const title = page.text.replace(/\s+/g, ' ').trim().slice(0, 100);
      entries.push({
        title: title || `Página ${index + 1}`,
        page: index + 1,
        pdfPage: index + 1,
        depth: 0
      });
    });
  }

  const tree = [];
  const stack = [];
  for (const entry of entries) {
    const depth = Math.min(entry.depth, 3);
    const node = { entry, children: [] };
    const parent = stack[depth - 1];
    (parent ? parent.children : tree).push(node);
    stack.length = depth;
    stack.push(node);
  }

  const list = rulebookElements.contents;
  list.replaceChildren();
  const appendEntries = (nodes, container, depth = 0) => {
    for (const { entry, children } of nodes) {
      const item = document.createElement('div');
      item.className = `rulebook-contents-item${depth === 0 ? ' is-chapter' : ''}`;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `rulebook-contents-link${depth === 0 ? ' is-chapter-link' : ''}`;
      button.dataset.page = String(entry.pdfPage);
      const included = entry.pdfPage <= pdf.numPages;
      button.disabled = !included;
      button.classList.toggle('is-unavailable', !included);
      button.title = included
        ? `Abrir na página ${entry.page}`
        : `A página ${entry.page} não está incluída neste PDF.`;
      button.setAttribute('aria-label', included
        ? `${entry.title}, página ${entry.page}`
        : `${entry.title}, página ${entry.page}, não incluída neste PDF`);
      const pageLabel = document.createElement('span');
      pageLabel.className = 'rulebook-contents-page';
      pageLabel.textContent = `P. ${entry.page}`;
      const title = document.createElement('span');
      title.className = 'rulebook-contents-title';
      title.textContent = entry.title || `Página ${entry.page}`;
      button.append(pageLabel, title);
      item.append(button);
      if (children.length) {
        const group = document.createElement('div');
        group.className = 'rulebook-contents-children';
        appendEntries(children, group, depth + 1);
        item.append(group);
      }
      container.append(item);
    }
  };
  appendEntries(tree, list);
  const unavailableEntries = fromPrintedContents
    ? entries.filter(entry => entry.pdfPage > pdf.numPages).length
    : 0;
  rulebookElements.contentsDescription.textContent = unavailableEntries
    ? `${unavailableEntries} destino(s) do sumário estão além do conteúdo deste PDF reduzido.`
    : 'Escolha um capítulo para abrir diretamente nessa parte.';
  return true;
}

function resolvePrintedPage(entry, pages) {
  const expectedPage = entry.page + RULEBOOK_PRINTED_PAGE_OFFSET;
  const anchor = normalizeSearchText(entry.title)
    .text.replace(/^capitulo\s+[a-z0-9]*\s*/, '').trim();
  if (!anchor) return null;

  const firstPage = Math.max(1, expectedPage - 2);
  const lastPage = Math.min(pages.length, expectedPage + 2);
  const matches = [];
  for (let pageNumber = firstPage; pageNumber <= lastPage; pageNumber++) {
    if (pages[pageNumber - 1].normalized.text.includes(anchor)) matches.push(pageNumber);
  }
  return matches.sort((a, b) => Math.abs(a - expectedPage) - Math.abs(b - expectedPage))[0] || null;
}

function extractPrintedContents(pages) {
  const contentsPage = pages.find(page => page.normalized.text.includes('sumari'));
  if (!contentsPage) return [];

  const entries = [];
  for (const side of ['left', 'right']) {
    const rows = [];
    for (const item of contentsPage.items) {
      if (!item.transform || !item.text.trim()) continue;
      const x = item.transform[4];
      if (side === 'left' ? x >= 310 : x < 310) continue;
      const y = item.transform[5];
      let row = rows.find(candidate => Math.abs(candidate.y - y) <= 4);
      if (!row) {
        row = { y, items: [] };
        rows.push(row);
      }
      row.items.push({ x, text: item.text.trim() });
    }
    rows.sort((a, b) => b.y - a.y);
    const bufferedLines = [];
    for (const row of rows) {
      const columnItems = row.items.sort((a, b) => a.x - b.x);
      if (!columnItems.length) continue;

      let pageItemIndex = -1;
      let printedPage = null;
      for (let index = columnItems.length - 1; index >= 0; index--) {
        const { x, text } = columnItems[index];
        const exactPage = text.match(/^(\d{1,3})$/);
        const trailingPage = side === 'right' && x >= 390
          ? text.match(/(?:\.{2,}\s*)?(\d{1,3})$/)
          : null;
        const match = exactPage || trailingPage;
        if (match) {
          pageItemIndex = index;
          printedPage = Number(match[1]);
          if (exactPage) {
            columnItems[index].text = '';
          } else if (trailingPage) {
            columnItems[index].text = text.slice(0, match.index).replace(/[.\s]+$/, '');
          }
          break;
        }
      }

      const titleItems = pageItemIndex >= 0
        ? columnItems.slice(0, pageItemIndex + 1).filter(item => item.text)
        : columnItems;
      const line = titleItems.map(item => item.text).join(' ').replace(/\s+/g, ' ').trim();
      if (normalizeSearchText(line).text.startsWith('sumari')) {
        bufferedLines.length = 0;
        continue;
      }
      if (line) bufferedLines.push(line);
      if (printedPage === null) continue;

      const title = bufferedLines.join(' ').replace(/\s+/g, ' ').replace(/[.\s]+$/, '').trim();
      bufferedLines.length = 0;
      if (!title) continue;
      entries.push({
        title,
        page: printedPage,
        depth: /^(CAP[IÍ]TULO(?:S)?\b|AP[EÊ]NDICE\b|[ÍI]NDICE\b|FICHA DE PERSONAGEM\b|INTRODU[CÇ][AÃ]O\b)/i.test(title)
          ? 0
          : 1
      });
    }
  }
  return entries;
}

function showRulebookContents() {
  if (rulebookState.renderTask) {
    rulebookState.renderTask.cancel();
    rulebookState.renderTask = null;
  }
  rulebookState.renderId++;
  rulebookElements.home.classList.remove('hidden');
  rulebookElements.pageScroller.classList.add('hidden');
}

function normalizeSearchText(text) {
  const normalized = [];
  const sourceIndexes = [];
  for (let index = 0; index < text.length;) {
    const codePoint = text.codePointAt(index);
    const character = String.fromCodePoint(codePoint);
    const folded = character.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    for (const foldedCharacter of folded) {
      normalized.push(foldedCharacter);
      sourceIndexes.push(index);
    }
    index += character.length;
  }
  return { text: normalized.join(''), sourceIndexes };
}

function searchRulebook(term) {
  const query = normalizeSearchText(term).text.trim();
  rulebookState.hits = [];
  rulebookState.activeHit = -1;
  if (!query) {
    renderRulebookResults();
    updateRulebookOccurrenceControls();
    setRulebookStatus(`Livro pronto para consulta · ${rulebookState.pages.length} páginas`);
    showRulebookPage(rulebookState.page);
    return;
  }

  rulebookState.pages.forEach((page, pageIndex) => {
    let offset = 0;
    while ((offset = page.normalized.text.indexOf(query, offset)) !== -1) {
      const sourceStart = page.normalized.sourceIndexes[offset];
      const sourceEndIndex = page.normalized.sourceIndexes[offset + query.length - 1];
      const sourceEnd = sourceEndIndex + (page.text.codePointAt(sourceEndIndex) > 0xffff ? 2 : 1);
      const snippetStart = Math.max(0, sourceStart - 58);
      const snippetEnd = Math.min(page.text.length, sourceEnd + 78);
      rulebookState.hits.push({
        page: pageIndex + 1,
        sourceStart,
        sourceEnd,
        snippet: `${snippetStart > 0 ? '…' : ''}${page.text.slice(snippetStart, snippetEnd)}${snippetEnd < page.text.length ? '…' : ''}`,
        snippetMatchStart: sourceStart - snippetStart + (snippetStart > 0 ? 1 : 0),
        snippetMatchEnd: sourceEnd - snippetStart + (snippetStart > 0 ? 1 : 0)
      });
      offset += Math.max(1, query.length);
    }
  });

  if (rulebookState.hits.length) {
    rulebookState.activeHit = 0;
    setRulebookStatus(`${rulebookState.hits.length} ocorrência(s) encontrada(s).`);
    showActiveRulebookHit();
  } else {
    setRulebookStatus(`Nenhum resultado encontrado para “${term}”.`);
    showRulebookPage(rulebookState.page);
  }
  renderRulebookResults();
  updateRulebookOccurrenceControls();
}

function escapeRulebookHtml(text) {
  return text.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function renderRulebookResults() {
  const list = rulebookElements.results;
  if (!rulebookState.hits.length) {
    list.innerHTML = `<li class="rulebook-empty">${rulebookElements.searchInput.value.trim()
      ? 'Nenhum resultado encontrado.'
      : 'Digite um termo para pesquisar no livro.'}</li>`;
    return;
  }

  const firstIndex = Math.min(
    Math.max(0, rulebookState.activeHit - Math.floor(RULEBOOK_RESULT_WINDOW / 2)),
    Math.max(0, rulebookState.hits.length - RULEBOOK_RESULT_WINDOW)
  );
  const visibleHits = rulebookState.hits.slice(firstIndex, firstIndex + RULEBOOK_RESULT_WINDOW);
  const prefix = rulebookState.hits.length > RULEBOOK_RESULT_WINDOW
    ? `<li class="rulebook-empty">Exibindo ${firstIndex + 1}–${firstIndex + visibleHits.length} de ${rulebookState.hits.length}. Use as setas para navegar.</li>`
    : '';
  list.innerHTML = prefix + visibleHits.map((hit, visibleIndex) => {
    const index = firstIndex + visibleIndex;
    const before = escapeRulebookHtml(hit.snippet.slice(0, hit.snippetMatchStart));
    const match = escapeRulebookHtml(hit.snippet.slice(hit.snippetMatchStart, hit.snippetMatchEnd));
    const after = escapeRulebookHtml(hit.snippet.slice(hit.snippetMatchEnd));
    return `<li><button type="button" class="rulebook-result" data-hit-index="${index}" aria-current="${index === rulebookState.activeHit}">
      <span class="rulebook-result-page">Página ${hit.page}</span>
      <span class="rulebook-result-snippet">${before}<mark>${match}</mark>${after}</span>
    </button></li>`;
  }).join('');
}

function updateRulebookOccurrenceControls() {
  const total = rulebookState.hits.length;
  const current = rulebookState.activeHit + 1;
  rulebookElements.occurrenceCount.textContent = `${total ? current : 0} / ${total}`;
  rulebookElements.previousResult.disabled = total < 2;
  rulebookElements.nextResult.disabled = total < 2;
  rulebookElements.previousPage.disabled = !rulebookState.document || rulebookState.page <= 1;
  rulebookElements.nextPage.disabled = !rulebookState.document || rulebookState.page >= rulebookState.document.numPages;
}

function showActiveRulebookHit() {
  const hit = rulebookState.hits[rulebookState.activeHit];
  if (!hit) return;
  rulebookState.page = hit.page;
  renderRulebookResults();
  updateRulebookOccurrenceControls();
  showRulebookPage(hit.page, hit);
}

function moveRulebookHit(direction) {
  if (!rulebookState.hits.length) return;
  rulebookState.activeHit = (rulebookState.activeHit + direction + rulebookState.hits.length) % rulebookState.hits.length;
  showActiveRulebookHit();
}

async function showRulebookPage(pageNumber, activeHit = null) {
  if (!rulebookState.document) return;
  rulebookElements.home.classList.add('hidden');
  rulebookElements.pageScroller.classList.remove('hidden');
  const page = Math.min(rulebookState.document.numPages, Math.max(1, Number(pageNumber) || 1));
  rulebookState.page = page;
  rulebookElements.pageInput.value = String(page);
  rulebookElements.previousPage.disabled = page <= 1;
  rulebookElements.nextPage.disabled = page >= rulebookState.document.numPages;
  const renderId = ++rulebookState.renderId;
  if (rulebookState.renderTask) {
    rulebookState.renderTask.cancel();
    rulebookState.renderTask = null;
  }

  try {
    const pdfPage = await rulebookState.document.getPage(page);
    if (renderId !== rulebookState.renderId) return;
    const baseViewport = pdfPage.getViewport({ scale: 1 });
    const availableWidth = Math.max(1, rulebookElements.pageScroller.clientWidth - 40);
    const scale = Math.min(1, availableWidth / baseViewport.width) * rulebookState.zoom;
    const viewport = pdfPage.getViewport({ scale });
    const outputScale = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    rulebookElements.pageWrap.replaceChildren(canvas);
    rulebookElements.pageWrap.style.width = `${viewport.width}px`;
    rulebookElements.pageWrap.style.height = `${viewport.height}px`;
    rulebookElements.zoomLabel.textContent = `${Math.round(rulebookState.zoom * 100)}%`;

    const task = pdfPage.render({
      canvasContext: context,
      viewport,
      transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null
    });
    rulebookState.renderTask = task;
    await task.promise;
    if (renderId !== rulebookState.renderId) return;
    rulebookState.renderTask = null;

    const textItems = (await pdfPage.getTextContent()).items;
    const query = normalizeSearchText(rulebookElements.searchInput.value).text.trim();
    const activePageOffset = activeHit && activeHit.page === page ? activeHit.sourceStart : -1;
    let sourceOffset = 0;
    for (const item of textItems) {
      if (typeof item.str !== 'string' || !item.str) continue;
      if (sourceOffset) sourceOffset += 1;
      const start = sourceOffset;
      sourceOffset += item.str.length;
      const normalizedItem = normalizeSearchText(item.str);
      if (!query || !normalizedItem.text.includes(query) || !item.transform) continue;
      const transform = window.pdfjsLib.Util.transform(viewport.transform, item.transform);
      const height = Math.hypot(transform[2], transform[3]);
      let matchOffset = 0;
      while ((matchOffset = normalizedItem.text.indexOf(query, matchOffset)) !== -1) {
        const matchStart = normalizedItem.sourceIndexes[matchOffset];
        const matchEndIndex = normalizedItem.sourceIndexes[matchOffset + query.length - 1];
        const matchEnd = matchEndIndex + (item.str.codePointAt(matchEndIndex) > 0xffff ? 2 : 1);
        const highlight = document.createElement('span');
        highlight.className = `rulebook-highlight${activePageOffset === start + matchStart ? ' is-current' : ''}`;
        highlight.style.left = `${transform[4] + item.width * scale * matchStart / item.str.length}px`;
        highlight.style.top = `${transform[5] - height}px`;
        highlight.style.width = `${Math.max(3, item.width * scale * (matchEnd - matchStart) / item.str.length)}px`;
        highlight.style.height = `${Math.max(3, height)}px`;
        rulebookElements.pageWrap.append(highlight);
        matchOffset += Math.max(1, query.length);
      }
    }
  } catch (error) {
    if (error?.name === 'RenderingCancelledException') return;
    setRulebookStatus(`Falha ao renderizar a página ${page}: ${error.message || 'erro desconhecido'}`, 'error');
  }
}

rulebookElements.close.addEventListener('click', closeRulebook);
rulebookElements.modal.addEventListener('click', event => {
  if (event.target === rulebookElements.modal) closeRulebook();
});
rulebookElements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!rulebookState.pages.length) {
    setRulebookStatus('Aguarde o carregamento e a indexação do livro antes de pesquisar.', 'loading');
    return;
  }
  searchRulebook(rulebookElements.searchInput.value);
});
rulebookElements.results.addEventListener('click', event => {
  const result = event.target.closest('[data-hit-index]');
  if (!result) return;
  rulebookState.activeHit = Number(result.dataset.hitIndex);
  showActiveRulebookHit();
});
rulebookElements.contents.addEventListener('click', event => {
  const link = event.target.closest('[data-page]');
  if (!link) return;
  rulebookState.hits = [];
  rulebookState.activeHit = -1;
  rulebookElements.searchInput.value = '';
  renderRulebookResults();
  updateRulebookOccurrenceControls();
  showRulebookPage(link.dataset.page);
});
rulebookElements.showContents.addEventListener('click', showRulebookContents);
rulebookElements.previousResult.addEventListener('click', () => moveRulebookHit(-1));
rulebookElements.nextResult.addEventListener('click', () => moveRulebookHit(1));
rulebookElements.previousPage.addEventListener('click', () => showRulebookPage(rulebookState.page - 1));
rulebookElements.nextPage.addEventListener('click', () => showRulebookPage(rulebookState.page + 1));
rulebookElements.pageInput.addEventListener('change', () => showRulebookPage(rulebookElements.pageInput.value));
rulebookElements.zoomOut.addEventListener('click', () => {
  rulebookState.zoom = Math.max(0.5, Math.round((rulebookState.zoom - 0.1) * 10) / 10);
  showRulebookPage(rulebookState.page, rulebookState.hits[rulebookState.activeHit]);
});
rulebookElements.zoomIn.addEventListener('click', () => {
  rulebookState.zoom = Math.min(2.5, Math.round((rulebookState.zoom + 0.1) * 10) / 10);
  showRulebookPage(rulebookState.page, rulebookState.hits[rulebookState.activeHit]);
});
document.addEventListener('keydown', event => {
  if (rulebookElements.modal.classList.contains('hidden')) return;
  if (event.key === 'Escape') {
    event.stopPropagation();
    closeRulebook();
  } else if (event.key === 'Tab') {
    const focusable = [...rulebookElements.modal.querySelectorAll('button:not(:disabled), input:not(:disabled)')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
