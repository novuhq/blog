// Give the service worker access to Firebase Messaging.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "YOUR API KEY",
  authDomain: "real-time-notification-53c8b.firebaseapp.com",
  projectId: "YOUR PROJECT ID",
  storageBucket: "real-time-notification-53c8b.appspot.com",
  messagingSenderId: "YOUR SENDER ID",
  appId: "YOUR API ID",
  measurementId: "G-QXGZ04F4P7",
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Recieved Message :", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
