const cacheKey = 'notes-static-v1'
const appShell = [
  './',
  './bundle.js',
  './index.css',
  './assets/styles.css'
]

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheKey !== cacheName &&  cacheName.startsWith("notes-static")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', async () => {
  const cache = await caches.open(cacheKey)
  cache.addAll(appShell)
})

self.addEventListener('fetch', e => {
  const req = e.request;
  e.respondWith(cacheFirst(req))
})

async function cacheFirst(req) {
  const cacheResponse = await caches.match(req)
  return cacheResponse || fetch(req)
}
