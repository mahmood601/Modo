// Add assets to Cache

const assets = [
  "/",
  "/index.html",
  "/ar.html",
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


// Install the app
self.addEventListener("install", (event: any): void => {
  event?.waitUntil(async () => {
    const cache = await caches.open("modo")
    cache.addAll(assets)
  }
  )
})

// control of new clients right away
self.addEventListener('activate', (event: any) => {
  event?.waitUntil(self.clients.claim());
});

// Fetch Assets 
self.addEventListener('fetch', (event: any) => {
  event.respondWith(async () => {
      const cache = await caches.open("modo");

      // match the request to our cache
      const cachedResponse = await cache.match(event.request);

      // check if we got a valid response
      if (cachedResponse !== undefined) {
          // Cache hit, return the resource
          return cachedResponse;
      } else {
        // Otherwise, go to the network
          return fetch(event.request)
      };
  });
});

