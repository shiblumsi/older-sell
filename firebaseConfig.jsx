// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNvvwfauij6isWAwKJgJHPdIa5nsUNkdk",
  authDomain: "older-sell.firebaseapp.com",
  projectId: "older-sell",
  storageBucket: "older-sell.appspot.com",
  messagingSenderId: "74158114947",
  appId: "1:74158114947:web:cfb01a274bb118f6ceb3b6",
  measurementId: "G-Y3BDKGTC88",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
