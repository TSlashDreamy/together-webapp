import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref, set, update, remove, onValue } from "firebase/database";

const envData = import.meta.env;

const firebaseConfig: FirebaseOptions = {
  apiKey: envData.VITE_FIREBASE_API_KEY,
  authDomain: envData.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envData.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envData.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envData.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envData.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = {
  db: getDatabase(app),
  dbSet: set,
  dbGet: get,
  dbRef: ref,
  dbChild: child,
  dbUpdate: update,
  dbRemove: remove,
  dbOnValue: onValue,
};

export { app, auth, database };
