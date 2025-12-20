const CACHE_NAME = 'apklulu-cache-v1.0.5'; // ganti versi setiap update
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
  './assets/img/2bxUoiMZiTUWITao.png',
  './assets/img/2EjvyhNMo7IhYHv0.png',
  './assets/img/2mSLzoC6VaKg9G5y.jpg',
  './assets/img/3eVr8EQfYFOCXzjy.png',
  './assets/img/3TxQyknwmOKq4aUq.png',
  './assets/img/4N9nXFKTmEJUBl9g.png',
  './assets/img/4Q4HAv8VBYlUHAjZ.png',
  './assets/img/4qvaCEyPoRKnSoRK.png',
  './assets/img/4t5RvgC7uiRGNcZq.png',
  './assets/img/506zzvpHEcCz1fw1.png',
  './assets/img/5U6o0ebGTiBShfHF.png',
  './assets/img/641tmm7GA9EQLT88.png',
  './assets/img/77LKMry1UoqkYXrr.jpg',
  './assets/img/78h82sxOCWZU5iXM.png',
  './assets/img/7CYocqrfLOm9zL7i.jpg',
  './assets/img/7NyF4s7qBEfZdzYv.png',
  './assets/img/7XraZf4dTjhBCnGV.png',
  './assets/img/8txgJayRQEb6bL12.png',
  './assets/img/ApAdJUPi82CnZTCY.png',
  './assets/img/B9svWM0AockyegpM.jpg',
  './assets/img/BM487iU4Bxp9NPJT.jpg',
  './assets/img/bNf2DiYzvd9RaIe1.jpg',
  './assets/img/book-blue.png',
  './assets/img/BOPxvOvQoOweFna3.png',
  './assets/img/broadcast.png',
  './assets/img/COH9PQVpYiFScBlH.png',
  './assets/img/d8ClG2FW0RUdLfBF.png',
  './assets/img/desktop.png',
  './assets/img/DPmzuCH2rQlEDfqa.png',
  './assets/img/DUIA5m4LbJWbPBbn.png',
  './assets/img/dXWE0JfPeGe6yhov.png',
  './assets/img/ECNzxNfUvkFm4fci.png',
  './assets/img/egt8DoiXW11Q97PY.png',
  './assets/img/EmWHQHv3khjIG6Jb.png',
  './assets/img/EpMjjKkesBhNT5lI.png',
  './assets/img/fftANbjv93jOl65N.png',
  './assets/img/fnDYskKRsM11p1Uf.png',
  './assets/img/footer-mobile.jpg',
  './assets/img/G56oYQ3hpmUHJBgP.png',
  './assets/img/game-2-mobile.png',
  './assets/img/game-3-mobile.png',
  './assets/img/game-4-mobile.png',
  './assets/img/game-5-mobile.png',
  './assets/img/game-6-mobile.png',
  './assets/img/game-7-mobile.png',
  './assets/img/game-8-mobile.png',
  './assets/img/GGZSQzPi3K0EST06.png',
  './assets/img/gmmomXzsKnwrcfOJ.png',
  './assets/img/gQsHrMWuWIn6Jkwd.png',
  './assets/img/hMlC4VpkY755Pr3o.jpg',
  './assets/img/hP4uaW1j9K2AlyVv.png',
  './assets/img/HpN4bTRFqDot7sq4.png',
  './assets/img/hU7lEGuKZbz9OLTP.png',
  './assets/img/HyfhgwpNUWrzVY5D.png',
  './assets/img/I10CIHwGhNcxSY0N.png',
  './assets/img/IaFiCl56FJpTz4pd.png',
  './assets/img/jackpot-mobile.jpg',
  './assets/img/JMWGAwRJouC2hmH6.png',
  './assets/img/k4EGb86Wy3xRseCd.png',
  './assets/img/kFdpl9SeA38NdO7f.png',
  './assets/img/kOhTvpgAcK7PMiNR.png',
  './assets/img/KQ9ioPngRVBhfjaH.png',
  './assets/img/kvN6HVotOvAMRzJk.png',
  './assets/img/lPMJOQdvuxmZl4XR.jpg',
  './assets/img/lsLs8N1KmgtKh8Ou.png',
  './assets/img/LTwV786LLLfZszw8.jpg',
  './assets/img/lvQoNDpqIVWb0zas.png',
  './assets/img/menu-1.png',
  './assets/img/menu-2.png',
  './assets/img/menu-3.png',
  './assets/img/menu-4.png',
  './assets/img/menu-5.png',
  './assets/img/menu.png',
  './assets/img/mrrP7P7QLTuH5XcL.png',
  './assets/img/Mt6aVgip4p7YGtB8.jpg',
  './assets/img/NpdM33GcsFfWoT9U.png',
  './assets/img/NQLOXaCrM298SxMK.png',
  './assets/img/NYi4Q4IkxFuwV7Ic.png',
  './assets/img/oRI9UH3PqlrVdkrc.png',
  './assets/img/OVssGriZth5EhjaB.png',
  './assets/img/ovvQTpwHZFTyauAL.png',
  './assets/img/OXMhDarBTGLy67dj.png',
  './assets/img/OxRGZisxBcqAj8eM.png',
  './assets/img/p7g9ot1imVr9V8ei.png',
  './assets/img/password.png',
  './assets/img/PCIJfHBobXU23DYh.png',
  './assets/img/PcM0ND3RJmzOwkyM.png',
  './assets/img/pCy6mvhhS7290YB4.gif',
  './assets/img/PdoCaJ3tv4YPceEQ.png',
  './assets/img/pFZb3hsQ2XOhP3Xb.png',
  './assets/img/q6wjThZYoh3MAjvR.jpg',
  './assets/img/qAS4benNwP9OhFfm.png',
  './assets/img/qKNOBHGMC3Wg7dUY.png',
  './assets/img/Qn9ydbba5HAHVpqt.png',
  './assets/img/qnPX8qvYnT6sdVoH.png',
  './assets/img/qVj2pc4tq5jNTETa.png',
  './assets/img/QVsxEuFUnbJUSWvq.png',
  './assets/img/qYbwJgxwboqgp2vv.png',
  './assets/img/RF3e3cnDiWtzpPxE.png',
  './assets/img/RLbgt84eD1uoUIno.png',
  './assets/img/sfS8Gcxtut7UhUfQ.png',
  './assets/img/sgzTzSd6VUu7IdxL.jpg',
  './assets/img/STgyifWgfxZX8Xdd.png',
  './assets/img/STjV8dUJyrNVfCPq.png',
  './assets/img/SZwKtjnBCApJXQSX.png',
  './assets/img/T15pFEYAhfe4PSYa.png',
  './assets/img/TIHHJatZGX0j0E7O.png',
  './assets/img/TlkoQsc4Uwjv7ls6.png',
  './assets/img/TS5Hs0Er3bKNf1Gm.png',
  './assets/img/u6CrwN7HjS7YpyMk.png',
  './assets/img/UaFoOedpYsw8wTlM.png',
  './assets/img/username.png',
  './assets/img/v8SoZ8YDSllm4bnH.png',
  './assets/img/VahK6oop7qhgeCuc.png',
  './assets/img/vCpvblkSAYmNEPky.png',
  './assets/img/vqbAoeN3q4GEbtQz.png',
  './assets/img/VXxFB9VzGIBq9BDX.png',
  './assets/img/w9D4o4hXE6Ffxkct.png',
  './assets/img/wBMn0JMwHqR15Q9h.png',
  './assets/img/wbqQE1MyfQYM6gIG.png',
  './assets/img/wfiRplgwD6bKjy3P.jpg',
  './assets/img/WhB6ZwNaUh1FaicC.png',
  './assets/img/wvbEnWbNb17vNCcO.png',
  './assets/img/ww4Sx6Wd7jl3Kw0U.jpg',
  './assets/img/wyXBm4tmKtbDO83q.jpg',
  './assets/img/WZTONz0FyVvKtsTx.jpg',
  './assets/img/x4A54lpFqLrFvhFp.png',
  './assets/img/x7mLRm9LFNKhVgfd.png',
  './assets/img/xI2jQE8BO5dC2OI6.jpg',
  './assets/img/XLcKkSGsXDbITBPr.gif',
  './assets/img/XsVjAaNBoIpN5Ceq.png',
  './assets/img/y2c0tUmMZwm2zVOq.jpg',
  './assets/img/y4zQhrs8056gsrG9.png',
  './assets/img/Y6z4g9iAch8XkEFC.png',
  './assets/img/YhxpfaUCngU9U9zA.png',
  './assets/img/YMB5vRqv4ay7ACM5.png',
  './assets/img/YpMisNvksbUZnl9M.png',
  './assets/img/yuegsPSogYIzRDNR.jpg',
  './assets/img/z3JBuC9gdC8YRGi5.png',
  './assets/img/z5gKY7NUGNsjppJ5.png',
  './assets/img/Zawv1ETDe1MiBN1v.png',
  './assets/img/zQhLX87lI5RdNLhR.png',
  './assets/img/ZTKbmNvIXuYkaGkQ.jpg',
  './assets/img/ZV7vTJPNrYzdfUKE.png',
  './assets/img/zYSbZe6vw1agXk2u.png',
  './assets/js/bootstrap.min.js',
  './assets/js/custom.min.js',
  './assets/js/jquery.min.js',
  './assets/webfonts/fa-brands-400.eot',
  './assets/webfonts/fa-brands-400.ttf',
  './assets/webfonts/fa-brands-400.woff',
  './assets/webfonts/fa-brands-400.woff2',
  './assets/webfonts/fa-regular-400.eot',
  './assets/webfonts/fa-regular-400.ttf',
  './assets/webfonts/fa-regular-400.woff',
  './assets/webfonts/fa-regular-400.woff2',
  './assets/webfonts/fa-solid-900.eot',
  './assets/webfonts/fa-solid-900.ttf',
  './assets/webfonts/fa-solid-900.woff',
  './assets/webfonts/fa-solid-900.woff2',
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
  if (!event.request.url.startsWith(self.location.origin)) {
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


self.addEventListener('push', event => {
  const defaultOptions = {
    title: 'New Notification',
    body: 'You have a new message!',
    icon: './icons/icon-192x192.png',
    badge: './icons/icon-96x96.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'default-notification'
    },
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: 'assets/android-chrome-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'assets/android-chrome-192x192.png'
      }
    ],
    requireInteraction: false,
    silent: false
  };
  
  let notificationOptions = { ...defaultOptions };
  
  if (event.data) {
    try {
      const pushData = event.data.json();
      
      notificationOptions = {
        ...defaultOptions,
        title: pushData.title || defaultOptions.title,
        body: pushData.body || pushData.message || defaultOptions.body,
        icon: pushData.icon || defaultOptions.icon,
        badge: pushData.badge || defaultOptions.badge,
        data: {
          ...defaultOptions.data,
          ...pushData.data,
          url: pushData.url || './'
        }
      };
    } catch (error) {
      notificationOptions.body = event.data.text() || defaultOptions.body;
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationOptions.title, notificationOptions)
  );
});

self.addEventListener('notificationclick', event => {
  
  const notification = event.notification;
  const action = event.action;
  const data = notification.data || {};
  
  notification.close();
  
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'NOTIFICATION_CLICKED',
        action: action,
        data: data
      });
    });
  });
  
  if (action === 'close') {
    return;
  }
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clientList => {
      const urlToOpen = data.url || './';
      
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

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

self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const data = notification.data || {};
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});