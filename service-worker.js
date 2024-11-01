
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

// self.addEventListener('fetch', (event) => {
//     // Check if the request URL matches your specific cross-site URL
//     if (event.request.url === 'http://share.liveblog365.com/GJTy.php?f=FJoGiMxF.wasm') {
//         console.log('Intercepted request:', event.request.url);
//         event.respondWith(fetch('ATr0mzDy.wasm')); 
//     } else if (event.request.url === 'http://share.liveblog365.com/GJTy.php?f=9sx5.js') {
//         console.log('Intercepted request:', event.request.url);
//         event.respondWith(fetch('nom.js')); 
//     } else {
//         // Default fetch behavior for other requests
//         console.log('Default fetch:', event.request.url);
//         event.respondWith(fetch(event.request));
//     }
// });