
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "summer-school-9b4b4.firebaseapp.com",
  projectId: "summer-school-9b4b4",
  storageBucket: "summer-school-9b4b4.appspot.com",
  messagingSenderId: "569972281568",
  appId: "1:569972281568:web:626a4733b3413de5c58085",
  measurementId: "G-H1ZLDCJKM4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
