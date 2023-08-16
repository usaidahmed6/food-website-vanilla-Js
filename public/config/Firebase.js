import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, query, where, collection, addDoc, deleteDoc, getDocs, doc, setDoc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCM9IG-7JxDs_ubSgfl01bid_7yKDky-ao",
    authDomain: "food-app-vanilla-javascript.firebaseapp.com",
    projectId: "food-app-vanilla-javascript",
    storageBucket: "food-app-vanilla-javascript.appspot.com",
    messagingSenderId: "1015422802160",
    appId: "1:1015422802160:web:92d6c8ea7afabfa41f4a35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const FoodDisheRef = collection(db, "dishes");
const orderRef = collection(db, "order");
const userRef = collection(db, "users");
const storage = getStorage(app);

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    db,
    addDoc,
    ref,
    uploadBytes,
    storage,
    getDownloadURL,
    doc,
    setDoc,
    getDoc,
    collection,
    onSnapshot,
    getDocs,
    updateDoc,
    onAuthStateChanged,
    signOut,
    FoodDisheRef,
    query,
    where,
    userRef,
    deleteDoc,
    orderRef
}