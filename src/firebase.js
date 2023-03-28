// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8VRrv0LqyYsjByfIKRxeXUlxhXAX_Pig",
  authDomain: "chat-94c74.firebaseapp.com",
  projectId: "chat-94c74",
  storageBucket: "chat-94c74.appspot.com",
  messagingSenderId: "1058416546551",
  appId: "1:1058416546551:web:d3cc895f8298f5442ab9f2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
