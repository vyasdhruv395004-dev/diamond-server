importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Must contain the exact same config as your HTML files
firebase.initializeApp({
    apiKey: "AIzaSyA2tykGe6MCHTcnNsCp7yoHq7aUbykJA10",
    authDomain: "turnament-ee7b9.firebaseapp.com",
    projectId: "turnament-ee7b9",
    storageBucket: "turnament-ee7b9.firebasestorage.app",
    messagingSenderId: "489074413578",
    appId: "1:489074413578:web:e8d3e7f78113cba0534ff3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    
    const notificationTitle = payload.notification.title || 'New Tournament!';
    const notificationOptions = {
        body: payload.notification.body || 'Open the app to see details.',
        icon: payload.notification.icon || '/notif-icon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
