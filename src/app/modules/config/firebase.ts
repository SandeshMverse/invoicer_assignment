import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDTFIjr1Nm3DiBrbtAMYQwdC5Vw_gcrflo",
    authDomain: "invoicer-dfbab.firebaseapp.com",
    projectId: "invoicer-dfbab",
    storageBucket: "invoicer-dfbab.firebasestorage.app",
    messagingSenderId: "407137717661",
    appId: "1:407137717661:web:da6fa69bb9ae12c783b374"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);


