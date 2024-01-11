import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-odyJG-0TaOKEhyl-axx1YshXlfiRLW4",
  authDomain: "card-market-a238f.firebaseapp.com",
  projectId: "card-market-a238f",
  storageBucket: "card-market-a238f.appspot.com",
  messagingSenderId: "634061937444",
  appId: "1:634061937444:web:6a6a0755b82d871f0471b1",
  measurementId: "G-DT6652BX21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore( app )