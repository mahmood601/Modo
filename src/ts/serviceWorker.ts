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
  event?.waitUntil(
    caches.open("modo").then((cache: Cache) => cache.addAll(assets))
  )
})

// Fetch Assets => [Need Review]
self.addEventListener('fetch', (event: any): void => {
  event.respondWith(
    caches.match(event.request).then((response: Response | undefined): Response | Promise<Response> => {
      return response || fetch(event.request);
    })
  );
});


self.addEventListener('fetch', (event: any): void => {
  event.respondWith(
    caches.open('modo').then((cache) => fetch(event.request)
      .then((response: Response): Response => {
        cache.put(event.request, response.clone());
        return response;
      })
    )
  );
});


