
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');
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