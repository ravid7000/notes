const cacheKey = 'notes-static'
const appShell = [
  './',
  './bundle.js',
  './index.css',
  './assets/styles.css'
]

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
