import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDtTvF4B4U4Adq8HZG_H-55eJ5AQxblYXE",
  authDomain: "terzi-b0445.firebaseapp.com",
  projectId: "terzi-b0445",
  storageBucket: "terzi-b0445.appspot.com",
  messagingSenderId: "300278576994",
  appId: "1:300278576994:web:f2f87bddd972d8192dde3b"
};
const firebaseApplication = initializeApp(firebaseConfig);
const firestoreDb = getFirestore();
const firebaseAuth = getAuth();

export {firestoreDb, firebaseAuth} 
