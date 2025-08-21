// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkaB9fMnlfjp9aTbEzGZpXHP_lsuqQrOQ",
  authDomain: "iron-fit-9c9c0.firebaseapp.com",
  projectId: "iron-fit-9c9c0",
  storageBucket: "iron-fit-9c9c0.firebasestorage.app",
  messagingSenderId: "328276697531",
  appId: "1:328276697531:web:82e6a84504f70458a0249e",
  measurementId: "G-W5GZ1CSHSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);