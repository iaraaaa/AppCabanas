// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA8ee1AuxvPgv2541J6ehyw-H2DkRiFEhs",
    authDomain: "cabana-55a4c.firebaseapp.com",
    projectId: "cabana-55a4c",
    storageBucket: "cabana-55a4c.firebasestorage.app",
    messagingSenderId: "408758349775",
    appId: "1:408758349775:web:d0e07d27e4649e8eaa2cba",
    measurementId: "G-RDMJX2BPGR"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firestore y Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export { analytics };
