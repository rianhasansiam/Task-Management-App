// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCHh8dMR8LLmzwDfEQDhIDvN5Qc1nZUbpw",
    authDomain: "to-do-list-daa13.firebaseapp.com",
    projectId: "to-do-list-daa13",
    storageBucket: "to-do-list-daa13.firebasestorage.app",
    messagingSenderId: "300626057105",
    appId: "1:300626057105:web:de020ec4b991be5745ec30"
  };

  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
