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
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
const uuid = require("uuid");

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

export async function getUserDetails(uid) {
  return (await getDoc(doc(db, `users/${uid}`))).data();
}

export async function createProject(data) {
  try {
    const ref = doc(db, "projects", uuid.v4());
    await setDoc(ref, {
      ...data,
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function getProjects(setState) {
  return onSnapshot(collection(db, `projects`), (snapshot) => {
    const data = snapshot.docs.map((snap) => {
      return {
        id: snap.id,
        ...snap.data(),
      };
    });
    setState(data);
  });
}

export async function getTickets(id, setState) {
  return onSnapshot(collection(db, `projects`, id, "tickets"), (snapshot) => {
    const data = snapshot.docs.map((snap) => {
      return {
        id: snap.id,
        ...snap.data(),
      };
    });

    setState(data);
  });
}
export async function getComments(projectId, ticketId, setState) {
  return onSnapshot(
    collection(db, `projects`, projectId, "tickets", ticketId, "comments"),
    (snapshot) => {
      const data = snapshot.docs.map((snap) => {
        return {
          id: snap.id,
          ...snap.data(),
        };
      });

      setState(data);
    }
  );
}

export async function findProject(id) {
  return (await getDoc(doc(db, `projects/${id}`))).data();
}

export async function createTicket(id, data) {
  try {
    const ref = doc(db, `projects/${id}/tickets`, uuid.v4());
    await setDoc(ref, {
      ...data,
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function createComment(projectId, ticketId, data) {
  try {
    const ref = doc(
      db,
      `projects/${projectId}/tickets/${ticketId}/comments`,
      uuid.v4()
    );
    await setDoc(ref, {
      ...data,
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function deleteComment(projectId, ticketId, commentId) {
  try {
    return await deleteDoc(
      doc(db, "projects", projectId, "tickets", ticketId, "comments", commentId)
    );
  } catch (e) {
    throw new Error(e.message);
  }
}
