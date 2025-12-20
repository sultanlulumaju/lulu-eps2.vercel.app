importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

// ===== PWA CACHING (digabung dari service-worker.js) =====
const CACHE_NAME = 'apklulu-cache-v1.0.3';
const STATIC_ASSETS = [
  './',
  './index.html',
  './jquery-old.min.js',
  './manifest.json',
  './promo.html',
  './sosmed.html',
  './icon-192.png',
  './icon-512.png',
  './assets/android-chrome-192x192.png',
  './assets/android-chrome-512x512.png',
  './assets/apple-touch-icon.png',
  './assets/favicon-32x32.png',
  './assets/css/all.min.css',
  './assets/css/bootstrap.min.css',
  './assets/css/font-awesome.min.css',
  './assets/css/Open24DisplaySt.woff2',
  './assets/css/Poppins-Regular.ttf',
  './assets/css/Teko-SemiBold.ttf',
  './assets/fonts/fontawesome-webfont.woff2',
  './assets/fonts/glyphicons-halflings-regular.eot',
  './assets/fonts/glyphicons-halflings-regular.ttf',
  './assets/fonts/glyphicons-halflings-regular.woff',
  './assets/img/dXWE0JfPeGe6yhov.png',
  './assets/js/bootstrap.min.js',
  './assets/js/custom.min.js',
  './assets/js/jquery.min.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => {
        console.error('Failed to cache static assets during install:', error);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Jangan cache request ke OneSignal atau external URLs
  if (!event.request.url.startsWith(self.location.origin) ||
      event.request.url.includes('onesignal.com')) {
    return;
  }
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(error => {
            if (event.request.destination === 'document') {
              return caches.match('./offline.html');
            }
            throw error;
          });
      })
  );
});

// ===== ONESIGNAL NOTIFICATION HANDLERS =====
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.notification.data) {
    const data = event.notification.data;

    event.waitUntil(
      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      }).then(function(clientList) {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url && 'focus' in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(data.url || '/');
        }
      })
    );
  }
});

self.addEventListener('push', function(event) {
  if (event.data) {
    try {
      const data = event.data.json();
      console.log('[OneSignal SW] Push data:', data);
    } catch (e) {
      console.log('[OneSignal SW] Push data (text):', event.data.text());
    }
  }
});

self.addEventListener('notificationclose', function(event) {
  console.log('[OneSignal SW] Notification closed', event);
});

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    const response = await fetch('./manifest.json');
    if (response.ok) {
      console.log('[Service Worker] App update check completed');
    }
  } catch (error) {
    console.error('[Service Worker] Background sync failed:', error);
  }
}

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
