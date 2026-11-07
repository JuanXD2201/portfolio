// Service worker de injectionlab generado en el build. No editar a mano.
const PREFIX = 'injectionlab-';
const CACHE = PREFIX + '15d9dcbb4650';
const FILES = ["./","./assets/ibm-plex-mono-cyrillic-400-normal-BSMlKf0J.woff2","./assets/ibm-plex-mono-cyrillic-500-normal-Bq9vWWag.woff2","./assets/ibm-plex-mono-cyrillic-600-normal-CTOM6hUh.woff2","./assets/ibm-plex-mono-cyrillic-ext-400-normal-xuaO2J-f.woff2","./assets/ibm-plex-mono-cyrillic-ext-500-normal-BqneJy0T.woff2","./assets/ibm-plex-mono-cyrillic-ext-600-normal-V-xxqcpd.woff2","./assets/ibm-plex-mono-latin-400-normal-DMJ8VG8y.woff2","./assets/ibm-plex-mono-latin-500-normal-DSY6xOcd.woff2","./assets/ibm-plex-mono-latin-600-normal-BgSNZQsw.woff2","./assets/ibm-plex-mono-latin-ext-400-normal-BmRBH3aV.woff2","./assets/ibm-plex-mono-latin-ext-500-normal-CAhNIIs5.woff2","./assets/ibm-plex-mono-latin-ext-600-normal-D38SheWl.woff2","./assets/ibm-plex-mono-vietnamese-400-normal-BulugwFq.woff2","./assets/ibm-plex-mono-vietnamese-500-normal-DZ4AoWbu.woff2","./assets/ibm-plex-mono-vietnamese-600-normal-D2EvbN8M.woff2","./assets/ibm-plex-sans-cyrillic-400-normal-DZqxrq2p.woff2","./assets/ibm-plex-sans-cyrillic-500-normal-CocWQlwt.woff2","./assets/ibm-plex-sans-cyrillic-600-normal-71GNu3SW.woff2","./assets/ibm-plex-sans-cyrillic-ext-400-normal-g30qAdWV.woff2","./assets/ibm-plex-sans-cyrillic-ext-500-normal-Cs5J6C77.woff2","./assets/ibm-plex-sans-cyrillic-ext-600-normal-DUMzJB7m.woff2","./assets/ibm-plex-sans-greek-400-normal-_efipK4i.woff2","./assets/ibm-plex-sans-greek-500-normal-JMMifIXV.woff2","./assets/ibm-plex-sans-greek-600-normal-DzTrcv_p.woff2","./assets/ibm-plex-sans-latin-400-normal-CDDApCn2.woff2","./assets/ibm-plex-sans-latin-500-normal-6ng42L7E.woff2","./assets/ibm-plex-sans-latin-600-normal-CuJfVYMP.woff2","./assets/ibm-plex-sans-latin-ext-400-normal-C5H60-Va.woff2","./assets/ibm-plex-sans-latin-ext-500-normal-DakdToA3.woff2","./assets/ibm-plex-sans-latin-ext-600-normal-DOrvGEcy.woff2","./assets/ibm-plex-sans-vietnamese-400-normal-DG4YqDda.woff2","./assets/ibm-plex-sans-vietnamese-500-normal-e4dixQRQ.woff2","./assets/ibm-plex-sans-vietnamese-600-normal-DpPYBSTl.woff2","./assets/index-B806MWkg.css","./assets/index-DGJNJCcZ.js","./icon.svg","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest","./sql-wasm.wasm"];

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
