"use strict";
// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
self.addEventListener('install', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.waitUntil(caches.open("pwabuilder-offline-page")
        .then((cache) => cache.add("../index.html")));
}));
if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}
workbox.routing.registerRoute(new RegExp('/*'), new workbox.strategies.StaleWhileRevalidate({
    cacheName: "pwabuilder-offline-page"
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
                const cache = yield caches.open("pwabuilder-offline-page");
                const cachedResp = yield cache.match("../../index.html");
                return cachedResp;
            }
        }))());
    }
});
