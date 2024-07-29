import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence,browserSessionPersistence, } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence:
    Platform.OS === "web"
      ? browserSessionPersistence
      : getReactNativePersistence(AsyncStorage),
});
const database = getFirestore(app);

export { auth, database };