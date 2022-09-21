// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "pet-shop-app-3967e.firebaseapp.com",
    projectId: "pet-shop-app-3967e",
    storageBucket: "pet-shop-app-3967e.appspot.com",
    messagingSenderId: "114503596281",
    appId: "1:114503596281:web:2bfb4a42571fc9ef55ca28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()
export const storage = getStorage(app);
