const CACHE_VERSION = 'ficha-pwa-v2';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './pwa.js',
  './manifest.webmanifest',
  './script.js',
  './script-roster.js',
  './script-character.js',
  './script-render.js',
  './script-actions.js',
  './script-wizard.js',
  './script-obs-shared.js',
  './script-sync.js',
  './script-obs.js',
  './script-rulebook.js',
  './rules',
  './ta joia.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
const EXTERNAL_ASSET_HOSTS = new Set([
  'cdn.tailwindcss.com',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
]);
const OPTIONAL_EXTERNAL_ASSETS = [
  new Request('https://cdn.tailwindcss.com', { mode: 'no-cors' }),
  new Request('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', { mode: 'no-cors' }),
  new Request('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap', { mode: 'no-cors' })
];
const APP_ROOT = new URL('./', self.registration.scope);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL.map((path) => new URL(path, APP_ROOT))))
      .then(() => precacheOptionalExternalAssets())
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith('ficha-pwa-') && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== APP_ROOT.origin) {
    if (!EXTERNAL_ASSET_HOSTS.has(requestUrl.hostname)) return;
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request, RUNTIME_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if ((response.ok && response.status !== 206) || response.type === 'opaque') {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
  }
  return response;
}

async function precacheOptionalExternalAssets() {
  const cache = await caches.open(RUNTIME_CACHE);
  const results = await Promise.allSettled(OPTIONAL_EXTERNAL_ASSETS.map(async (request) => {
    const response = await fetch(request);
    if (!response.ok && response.type !== 'opaque') {
      throw new Error(`Unexpected response status ${response.status} for ${request.url}`);
    }
    await cache.put(request, response);
  }));
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.warn('Não foi possível preparar um recurso externo para uso offline:', OPTIONAL_EXTERNAL_ASSETS[index].url, result.reason);
    }
  });
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request)
      || await caches.match(new URL('./index.html', APP_ROOT));
    if (cached) return cached;
    throw error;
  }
}
