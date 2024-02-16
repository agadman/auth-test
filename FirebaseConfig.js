// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqy95Bqv4e4kljz10G5_tKIlUWG1U2ogY",
  authDomain: "prototypetest-4ba57.firebaseapp.com",
  projectId: "prototypetest-4ba57",
  storageBucket: "prototypetest-4ba57.appspot.com",
  messagingSenderId: "498812493991",
  appId: "1:498812493991:web:8b4dbfc9f1fb6aa5933b82"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP); 