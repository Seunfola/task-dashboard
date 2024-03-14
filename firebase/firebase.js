import { initializeApp, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

let app;

// Check if Firebase app is already initialized
try {
  app = getApp();
} catch (e) {
  // Firebase app is not initialized, so initialize it
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  app = initializeApp(firebaseConfig);
}

// Export Firebase auth and GoogleAuthProvider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
