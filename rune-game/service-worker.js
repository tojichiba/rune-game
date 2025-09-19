const CACHE_NAME = 'rune-game-cache-v1';
const FILES_TO_CACHE = [
  './index.html',
  './manifest.json',
  './success.mp3',
  './fadein.mp3',
  './runes.ttf'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => {
      return resp || fetch(evt.request);
    })
  );
});



