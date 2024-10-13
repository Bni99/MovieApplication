// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqr4hojrNqCrYq8d5i6b9wo4CP0EzFipo",
  authDomain: "movienight-475ab.firebaseapp.com",
  projectId: "movienight-475ab",
  storageBucket: "movienight-475ab.appspot.com",
  messagingSenderId: "523147710209",
  appId: "1:523147710209:web:79aa5dc4772e12e7301500",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
