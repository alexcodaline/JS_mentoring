const CACHE_NAME = 'api-cache-v1';
const STATIC_CACHE_NAME = 'static-cache-v1';

const STATIC_RESOURCES = [
'/',
'/index.html',
'/app.js'
];

self.addEventListener('install', event => {
event.waitUntil(
caches.open(STATIC_CACHE_NAME).then(cache => {
return cache.addAll(STATIC_RESOURCES);
})
);
});

self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.filter(cacheName => {
return (cacheName.startsWith('api-cache') && cacheName !== CACHE_NAME) ||
(cacheName.startsWith('static-cache') && cacheName !== STATIC_CACHE_NAME);
}).map(cacheName => {
return caches.delete(cacheName);
})
);
})
);
});

self.addEventListener('fetch', event => {
const url = new URL(event.request.url);

if (event.request.url.includes('/api.example.com/')) {
event.respondWith(handleApiRequest(event.request));
} else {
event.respondWith(handleStaticRequest(event.request));
}
});

async function handleApiRequest(request) {
const cache = await caches.open(CACHE_NAME);

try {
const cachedResponse = await cache.match(request);



if (cachedResponse) {
  const headers = new Headers(cachedResponse.headers);
  headers.set('x-cache-source', 'cache');
  const cachedResponseWithHeader = new Response(cachedResponse.body, {
    status: cachedResponse.status,
    statusText: cachedResponse.statusText,
    headers: headers
  });
  const networkResponsePromise = fetchAndCache(request, cache);
  return cachedResponseWithHeader;
}
return await fetchAndCache(request, cache);
} catch (error) {
const cachedResponse = await cache.match(request);
if (cachedResponse) {
const headers = new Headers(cachedResponse.headers);
headers.set('x-cache-source', 'cache');



  return new Response(cachedResponse.body, {
    status: cachedResponse.status,
    statusText: cachedResponse.statusText,
    headers: headers
  });
}
return new Response(JSON.stringify({ error: 'Офлайн режим. Дані недоступні.' }), {
  status: 503,
  headers: { 'Content-Type': 'application/json' }
});
}
}

async function fetchAndCache(request, cache) {
const networkResponse = await fetch(request);

if (networkResponse.ok) {
const headers = new Headers(networkResponse.headers);
headers.set('x-cache-source', 'network');



const responseToCache = networkResponse.clone();
const networkResponseWithHeader = new Response(networkResponse.body, {
  status: networkResponse.status,
  statusText: networkResponse.statusText,
  headers: headers
});
cache.put(request, responseToCache);
return networkResponseWithHeader;
}

return networkResponse;
}

async function handleStaticRequest(request) {
const cache = await caches.open(STATIC_CACHE_NAME);
const cachedResponse = await cache.match(request);

if (cachedResponse) {
return cachedResponse;
}

try {
const networkResponse = await fetch(request);



if (networkResponse.ok) {
  cache.put(request, networkResponse.clone());
}
return networkResponse;
} catch (error) {
if (request.headers.get('accept').includes('text/html')) {
return cache.match('/offline.html');
}



return new Response('Офлайн режим. Ресурс недоступний.', {
  status: 503,
  headers: { 'Content-Type': 'text/plain' }
});
}
}