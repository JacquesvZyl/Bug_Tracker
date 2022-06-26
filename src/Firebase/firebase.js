// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlHyrXBWJ_xEt41DmjrpTLN-czaPmveoM",
  authDomain: "bug-tracker-1ec4b.firebaseapp.com",
  projectId: "bug-tracker-1ec4b",
  storageBucket: "bug-tracker-1ec4b.appspot.com",
  messagingSenderId: "148161179733",
  appId: "1:148161179733:web:9fdb040a5c09d29543e4dc",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
const auth = getAuth(firebaseApp);

export async function signInWithEmailAndPw(email, password) {
  try {
    if (!email || !password) throw new Error("Email or password is blank");
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function createAuthUserWithEmailAndPassword(email, password) {
  try {
    if (!email || !password) throw new Error("Email or password is blank");

    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export function onAuthStateChangeListener(callback) {
  onAuthStateChanged(auth, callback);
}

export async function signOutUser() {
  await signOut(auth);
}
