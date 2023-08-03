// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRUDvBd44I4FCyqA79nWqSiE4jM09CkFM",
  authDomain: "teksade-137c3.firebaseapp.com",
  projectId: "teksade-137c3",
  storageBucket: "teksade-137c3.appspot.com",
  messagingSenderId: "357374741639",
  appId: "1:357374741639:web:6aae627b181e42f8d3fc22",
  measurementId: "G-S5YJ4HF6F9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storageBucket = getStorage(app);
