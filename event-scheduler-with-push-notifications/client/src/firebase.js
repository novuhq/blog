import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "...",
	authDomain: "...",
	projectId: "...",
	storageBucket: "...",
	messagingSenderId: "...",
	appId: "...",
	measurementId: "...",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

export const getTokenFromFirebase = () => {
	return getToken(messaging, {
		vapidKey: "YOUR_WEB_PUSH_CERT_VAPID_KEY",
	})
		.then((currentToken) => {
			if (currentToken) {
				console.log("current token for client: ", currentToken);
			} else {
				console.log(
					"No registration token available. Request permission to generate one."
				);
			}
		})
		.catch((err) => {
			console.log("An error occurred while retrieving token. ", err);
		});
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			console.log(payload);
			resolve(payload);
		});
	});
