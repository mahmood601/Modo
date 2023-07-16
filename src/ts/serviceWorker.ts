const staticTodo = "Modo"
const assets = [
  "/",
  "/index.html",
  "/src/css/style.css",
  "/src/css/normalize.css",
  "/src/css/all.min.css",
  "/dit/main.js",
]

self.addEventListener("install", (installEvent: any) => {
  installEvent.waitUntil(
    caches.open(staticTodo).then(cache => {
      cache.addAll(assets)
    })
  )
})



self.addEventListener("fetch", (fetchEvent: any) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})

// self.addEventListener("beforeinstallprompt", (e) => {
//   console.log(e.target)
// })

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/dist/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
