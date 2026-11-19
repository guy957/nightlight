/* Nightlight service worker: the app opens instantly and offline; Firestore keeps its own offline copy. */
var VERSION = 'nightlight-5df7faf385';
var ASSETS = ["./", "./index.html", "./config.js", "./manifest.webmanifest", "./vendor/fb.js", "./vendor/qr.js", "./fonts/AtkinsonHyperlegible-Bold.woff2", "./fonts/AtkinsonHyperlegible-Regular.woff2", "./fonts/YoungSerif-Regular.woff2", "./icons/apple-touch-icon.png", "./icons/badge-96.png", "./icons/favicon-64.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png"];
self.addEventListener('install', function (e) {
  // fetch fresh copies, not whatever the browser's own cache still holds from the last version
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ASSETS.map(function (u) { return new Request(u, { cache: 'reload' }); })); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (/\/config\.js$/.test(url.pathname)) {
    // settings: newest when online, cached when not
    e.respondWith(fetch(req, { cache: 'no-cache' }).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () { return caches.match(req, { ignoreSearch: true }); }));
    return;
  }
  if (req.mode === 'navigate') {
    // newest app when online, cached app when not
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(VERSION).then(function (c) { c.put('./index.html', copy); });
      return res;
    }).catch(function () { return caches.match('./index.html'); }));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (hit) {
    return hit || fetch(req).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return res;
    });
  }));
});

/* Reminders: the Nightlight reminder service sends Web Push messages; show them even when the app is closed. */
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : '' }; }
  var opts = { body: d.body || '', icon: 'icons/icon-192.png', badge: 'icons/badge-96.png', data: { url: d.url || './#today' }, timestamp: d.at || Date.now() };
  if (d.tag) { opts.tag = d.tag; opts.renotify = true; }
  e.waitUntil(self.registration.showNotification(d.title || 'Nightlight', opts));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './#today';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
    return self.clients.openWindow ? self.clients.openWindow(url) : null;
  }));
});
