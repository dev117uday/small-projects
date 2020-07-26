const staticAssets = [
    './',
    './custom__1.css',
    './app.js',
    './manifest.json',
    './sw.js',
    
]

self.addEventListener('install', async event => {
    const cache =await caches.open('app-static');
    cache.addAll(staticAssets); 
    

});

self.addEventListener('fetch', event => {
console.log('done');
const req = event.request;
const url = new URL(req.url);


event.respondWith(cacheFirst(req));

})

