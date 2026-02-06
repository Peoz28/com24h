// Service Worker for Cơm 24h PWA
const CACHE_NAME = 'com24h-v1.0';
const STATIC_ASSETS = [
    '/',
    'index.html',
    'app.js',
    'styles.css',
    'manifest.json'
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching static assets');
            return cache.addAll(STATIC_ASSETS).catch(err => {
                console.log('Some assets failed to cache (may not exist):', err);
                return cache.addAll(STATIC_ASSETS.filter(url => !url.includes('images/')));
            });
        })
    );
    self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Network first for API calls and dynamic content
    if (request.url.includes('/api/') || request.url.includes('.json')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const cache = caches.open(CACHE_NAME);
                        cache.then(c => c.put(request, response.clone()));
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then(cachedResponse => {
                        return cachedResponse || new Response('Offline - No cached response', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
                })
        );
        return;
    }
    
    // Cache first for static assets (CSS, JS, images)
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(request)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }
                        
                        // Cache the successful response
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                        
                        return response;
                    })
                    .catch(() => {
                        // Show offline fallback
                        if (request.destination === 'image') {
                            return new Response(
                                '<svg role="img" aria-label="Offline" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
                                '<text x="50%" y="50%" text-anchor="middle" dy=".3em">Offline</text>' +
                                '</svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                        return new Response('Offline - Asset not available');
                    });
            })
    );
});

// Push Notification Event
self.addEventListener('push', (event) => {
    let notificationData = {
        title: 'Cơm 24h',
        body: 'Bạn có tin nhắn mới',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23FF5E00" width="192" height="192"/><text x="50%" y="50%" font-size="120" font-weight="bold" text-anchor="middle" dy=".3em" fill="white" font-family="Arial">Cơm</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><circle cx="48" cy="48" r="48" fill="%23FF5E00"/></svg>',
        tag: 'com24h-notification',
        requireInteraction: false
    };
    
    if (event.data) {
        try {
            const data = event.data.json();
            notificationData = { ...notificationData, ...data };
        } catch {
            notificationData.body = event.data.text();
        }
    }
    
    event.waitUntil(
        self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon,
            badge: notificationData.badge,
            tag: notificationData.tag,
            requireInteraction: notificationData.requireInteraction,
            actions: [
                { action: 'open', title: 'Mở' },
                { action: 'close', title: 'Đóng' }
            ]
        })
    );
});

// Notification Click Event
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const urlToOpen = '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Check if there's already a window/tab open with the target URL
            for (let i = 0; i < clientList.length; i++) {
                if (clientList[i].url === urlToOpen && 'focus' in clientList[i]) {
                    return clientList[i].focus();
                }
            }
            // If not, open a new window/tab with the target URL
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

// Background Sync API - Sync orders when back online
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-orders') {
        event.waitUntil(syncOrders());
    }
});

async function syncOrders() {
    try {
        // Get all clients and send a message to sync
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({ type: 'SYNC_ORDERS' });
        });
    } catch (error) {
        console.error('Error syncing orders:', error);
    }
}

// Periodic Background Sync - Check for order updates periodically
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'check-orders') {
        event.waitUntil(checkOrderUpdates());
    }
});

async function checkOrderUpdates() {
    try {
        // Notify clients about periodic sync
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({ type: 'ORDER_UPDATE_CHECK' });
        });
    } catch (error) {
        console.error('Error checking order updates:', error);
    }
}

// Message event for client communication
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('[Service Worker] Loaded and ready');
