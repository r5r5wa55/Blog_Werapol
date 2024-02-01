// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {


  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-c7580.firebaseapp.com",
  projectId: "blog-c7580",
  storageBucket: "blog-c7580.appspot.com",
  messagingSenderId: "219159277596",
  appId: "1:219159277596:web:20ee6b4bdac5fd382dafd9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);