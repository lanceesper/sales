import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmLGPp7r-BKckgA2QW_Df-s2RVyHExlSg",
  authDomain: "selljumia.firebaseapp.com",
  projectId: "selljumia",
  storageBucket: "selljumia.firebasestorage.app",
  messagingSenderId: "46332692777",
  appId: "1:46332692777:web:4f7d5e92a3f3338f7a4f38",
  measurementId: "G-XLYB3K8P0P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
