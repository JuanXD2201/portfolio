// Service worker de bodega generado en el build. No editar a mano.
const PREFIX = 'bodega-';
const CACHE = PREFIX + 'a172c9c9305d';
const FILES = ["./","./assets/barlow-condensed-latin-600-normal-DepVgxBB.woff2","./assets/barlow-condensed-latin-700-normal-v1xN8_Wq.woff2","./assets/barlow-latin-400-normal-qiz4-Cze.woff2","./assets/barlow-latin-500-normal-BPAOfeC8.woff2","./assets/barlow-latin-600-normal-DILqtrty.woff2","./assets/ibm-plex-mono-latin-400-normal-DMJ8VG8y.woff2","./assets/ibm-plex-mono-latin-500-normal-DSY6xOcd.woff2","./assets/index-B-1sRLAO.css","./assets/index-JDKptyju.js","./favicon.svg","./icon.svg","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest","./sql-wasm.wasm"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(caches.match('./index.html', { cacheName: CACHE }).then((hit) => hit || fetch(request)));
    return;
  }
  event.respondWith(caches.match(request, { cacheName: CACHE, ignoreSearch: true, ignoreVary: true }).then((hit) => hit || fetch(request)));
});
