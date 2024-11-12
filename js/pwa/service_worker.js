const CACHE_NAME = 'asteroid';
const urlsToCache = [
  '/asteroid',
  '/asteroid/index.html',
  '/asteroid/css/style.css',
  '/asteroid/js/game/game.js',
  '/asteroid/js/game/particles.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
