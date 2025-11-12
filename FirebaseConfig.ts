import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCIIXAf2_n74YmP4jBWDs3tKHIQ8XZZYPY",
  authDomain: "latihanpm1.firebaseapp.com",
  projectId: "latihanpm1",
  storageBucket: "latihanpm1.firebasestorage.app",
  messagingSenderId: "239737362624",
  appId: "1:239737362624:web:36dd5788b40a3da3767525"
};

const app = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const GOOGLE_PROVIDER = new GoogleAuthProvider();