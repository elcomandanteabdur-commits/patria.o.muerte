// patria.o.muerte - service worker
const CACHE = 'patria-o-muerte-v2';
const FILES = [
  './', './index.html', './biography.html', './diaries.html', './revolution.html',
  './last-campaign.html', './words.html', './gallery.html', './voices.html',
  './legacy.html', './poster.html', './css/style.css', './js/main.js',
  './manifest.json', './images/logo.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => {}))))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || r.headers.has('range') || r.destination === 'audio' || r.destination === 'video') return;

  // Pages: network first, cache as backup when offline
  if (r.mode === 'navigate') {
    e.respondWith(
      fetch(r).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(r, copy));
        return res;
      }).catch(() => caches.match(r).then(m => m || caches.match('./index.html')))
    );
    return;
  }

  // Everything else: cache first, then network (and save it)
  e.respondWith(
    caches.match(r).then(m => m || fetch(r).then(res => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(r, copy));
      }
      return res;
    }).catch(() => m))
  );
});
