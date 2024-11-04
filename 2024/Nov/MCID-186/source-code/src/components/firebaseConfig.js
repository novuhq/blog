import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);

export default firebase;

export const generateToken = async (setToken) => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "YOUR GENERATED TOKEN",
    });
    setToken(token);
    console.log(token);
  }
};
