const CACHE_NAME = 'tap-admin-v1';
const ASSETS = [
  '/ThesisArcPro/admin-app/index.html',
  '/ThesisArcPro/admin-app/style.css',
  '/ThesisArcPro/admin-app/app.js',
  '/ThesisArcPro/admin-app/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'New Message', body: 'You have a new message' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/admin-app/icon-192.png',
      badge: '/admin-app/icon-192.png',
      vibrate: [200, 100, 200]
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow('/admin-app/index.html')
  );
});