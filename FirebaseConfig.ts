// FirebaseConfig.ts — PASTIKAN INI BENAR 100%!
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIIXAf2_n74YmP4jBWDs3tKHIQ8XZZYPY",
  authDomain: "latihanpm1.firebaseapp.com",
  projectId: "latihanpm1",
  storageBucket: "latihanpm1.firebasestorage.app",
  messagingSenderId: "239737362624",
  appId: "1:239737362624:web:36dd5788b40a3da3767525"
};

const app = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(app);
export const FIRESTORE_DB = getFirestore(app);