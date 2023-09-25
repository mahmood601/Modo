var assets = [
    "/",
    "/index.html",
    "/dist/main.js",
    "/dist/serviceWorker.js",
    "/src/css/style.css",
    "/src/css/all.min.css",
    "/images/enter-task.webp",
    "/images/modo-light.webp",
    "/images/icon-72×72.ico",
    "/images/icon-72×72.webp",
    "/images/icon-96×96.webp",
    "/images/icon-128×128.webp",
    "/images/icon-144×144.webp",
    "/images/icon-152×152.webp",
    "/images/icon-192×192.webp",
    "/images/icon-384×384.webp",
    "/images/icon-512×512.webp",
    "/src/webfonts/fa-solid-900.ttf",
    "/src/webfonts/fa-brands-400.ttf",
    "/src/webfonts/fa-regular-400.ttf",
    "/src/webfonts/fa-v4compatibility.ttf",
    "/src/webfonts/fa-solid-900.woff2",
    "/src/webfonts/fa-brands-400.woff2",
    "/src/webfonts/fa-regular-400.woff2",
    "/src/webfonts/fa-v4compatibility.woff2",
];
self.addEventListener("install", function (e) {
    event === null || event === void 0 ? void 0 : event.waitUntil(caches.open("modo").then(function (cache) { return cache.addAll(assets); }));
});
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
    }));
});
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.open('modo').then(function (cache) { return fetch(event.request)
        .then(function (response) {
        cache.put(event.request, response.clone());
        return response;
    }); }));
});
Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status);
});
if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistrations().then(function (reg) {
        var options = {
            body: 'مرحبا انا محمود',
            icon: '../../images/icon-72×72.ico',
            badge: '../../images/icon-72×72.webp',
        };
        reg[0].showNotification('Modo', options);
    });
}
//# sourceMappingURL=serviceWorker.js.map