// Service worker de ledger generado en el build. No editar a mano.
const PREFIX = 'ledger-';
const CACHE = PREFIX + 'd353086406b9';
const FILES = ["./","./assets/fraunces-latin-ext-wght-normal-Ca2vKHc0.woff2","./assets/fraunces-latin-wght-normal-ukD16Tqj.woff2","./assets/fraunces-vietnamese-wght-normal-CnvboYUG.woff2","./assets/ibm-plex-mono-latin-400-normal-DMJ8VG8y.woff2","./assets/ibm-plex-mono-latin-500-normal-DSY6xOcd.woff2","./assets/index-CS-X-VOR.js","./assets/index-DYUoLIBl.css","./assets/source-sans-3-cyrillic-ext-wght-normal-c-5QAGAI.woff2","./assets/source-sans-3-cyrillic-wght-normal-BMDVbyM7.woff2","./assets/source-sans-3-greek-ext-wght-normal-BXZfsJY4.woff2","./assets/source-sans-3-greek-wght-normal-Cc-u-6OI.woff2","./assets/source-sans-3-latin-ext-wght-normal-C8iNium2.woff2","./assets/source-sans-3-latin-wght-normal-Bo_j9asI.woff2","./assets/source-sans-3-vietnamese-wght-normal-BDs68eHQ.woff2","./favicon.svg","./icon.svg","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest"];

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
