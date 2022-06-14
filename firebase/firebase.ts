// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification
} from "firebase/auth";
import {
    getDatabase,
    ref as firebaseDatabaseRef,
    set as firebaseSet,
    get,
    child,
    onValue
} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCo-fySXO4vK9GDfPVrGCJjJ2evMyqDA4k",
    authDomain: "training-app-a887a.firebaseapp.com",
    projectId: "training-app-a887a",
    storageBucket: "training-app-a887a.appspot.com",
    messagingSenderId: "624760936571",
    appId: "1:624760936571:web:0c71f9b9b38358a1b5eade",
    measurementId: "G-2M0G1K3BCS",
    databaseURL: "https://training-app-a887a-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const firebaseDatabase = getDatabase();


export {
    auth,
    firebaseDatabase,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    firebaseDatabaseRef,
    firebaseSet,
    sendEmailVerification,
    get,
    child,
    onValue
}