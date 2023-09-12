"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CACHE = "pwabuilder-offline-page";
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
const offlineFallbackPage = "ToDo-replace-this-name.html";
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
self.addEventListener('install', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.waitUntil(caches.open(CACHE)
        .then((cache) => cache.add(offlineFallbackPage)));
}));
if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}
workbox.routing.registerRoute(new RegExp('/*'), new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
}));
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const preloadResp = yield event.preloadResponse;
                if (preloadResp) {
                    return preloadResp;
                }
                const networkResp = yield fetch(event.request);
                return networkResp;
            }
            catch (error) {
                const cache = yield caches.open(CACHE);
                const cachedResp = yield cache.match(offlineFallbackPage);
                return cachedResp;
            }
        }))());
    }
});
//# sourceMappingURL=sw.js.map