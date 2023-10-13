// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3S2ziSow0L3kEJAHPFTp1PU44Bii80u8",
  authDomain: "fitness-native-app.firebaseapp.com",
  projectId: "fitness-native-app",
  storageBucket: "fitness-native-app.appspot.com",
  messagingSenderId: "1075407994229",
  appId: "1:1075407994229:web:e14f530e817ac5fbafa73c",
  measurementId: "G-CHYV7CKFWT"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
