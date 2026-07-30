const CACHE = 'tool-timer-v1';
const urls = ['/', '/tools/timer/', '/tools/timer/manifest.json'];
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(urls); }));
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(ks) {
    return Promise.all(ks.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
  }));
});
self.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request).then(function(r) { return r || fetch(e.request); }));
});
