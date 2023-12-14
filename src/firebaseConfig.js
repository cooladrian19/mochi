import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGWJ-KS0wam04bveCFAN1KAsLLLQ959FA",
  authDomain: "mochi-11f4e.firebaseapp.com",
  projectId: "mochi-11f4e",
  storageBucket: "mochi-11f4e.appspot.com",
  messagingSenderId: "1005476959415",
  appId: "1:1005476959415:web:b84f169c96b33524c92932"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth  = getAuth();
export const storage = getStorage();
export const db = getFirestore();