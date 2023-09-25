const assets = [
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
self.addEventListener("install", (e: any) => {
  event?.waitUntil(
    caches.open("modo").then((cache: Cache) => cache.addAll(assets))
  )
})

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});


self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.open('modo').then((cache) =>  fetch(event.request)
    .then((response) => {
        cache.put(event.request, response.clone());
        return response;
      })
    )
  );
});


Notification.requestPermission((status) => {
  console.log('Notification permission status:', status);
});

if (Notification.permission === 'granted') {
  navigator.serviceWorker.getRegistrations().then((reg) => {
    var options = {
      body: 'This is the body of the notification',
      icon: 'icon.png',
      badge: 'badge.png'
    };

    reg[0].showNotification('Notification Title', options);
  });
}


self.addEventListener('notificationclick', (event: any) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://example.com')
  );
});
