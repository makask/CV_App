// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "cv-app-1f4e6.firebaseapp.com",
  projectId: "cv-app-1f4e6",
  storageBucket: "cv-app-1f4e6.appspot.com",
  messagingSenderId: "331149295804",
  appId: "1:331149295804:web:5fad138f12317d9b67d0b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);