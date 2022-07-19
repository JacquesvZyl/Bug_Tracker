// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//const { initializeApp } = require("firebase-admin/app");
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
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
      creationDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
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

export async function getAllTickets() {
  const resp = await getDocs(collection(db, `projects`));
  const data = await Promise.all(
    resp.docs.map(async (doc) => {
      const tickets = await getDocs(
        collection(db, "projects", doc.id, "tickets")
      );

      const ticketData = tickets.docs.map((ticket) => {
        return { id: ticket.id, ...ticket.data() };
      });

      return ticketData;
    })
  );

  return data.flat();
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
export async function getUsers(setState) {
  try {
    return onSnapshot(collection(db, `users`), (doc) => {
      const data = doc.docs.map((snap) => {
        return {
          id: snap.id,
          ...snap.data(),
        };
      });

      setState(data);
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function setModificationDate(projectId) {
  try {
    await updateDoc(doc(db, "projects", projectId), {
      modifiedDate: new Date().toISOString(),
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function findProject(id) {
  return (await getDoc(doc(db, `projects/${id}`))).data();
}

export async function createTicket(projectId, data) {
  try {
    const createdId = uuid.v4();
    const ref = doc(db, `projects/${projectId}/tickets`, createdId);
    await setDoc(ref, {
      ...data,
      creationDate: new Date().toISOString(),
    });

    await setModificationDate(projectId);
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

    await setModificationDate(projectId);
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function deleteComment(projectId, ticketId, commentId) {
  try {
    await setModificationDate(projectId);

    return await deleteDoc(
      doc(db, "projects", projectId, "tickets", ticketId, "comments", commentId)
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function deleteTicket(projectId, ticketId) {
  try {
    await setModificationDate(projectId);
    return await deleteDoc(doc(db, "projects", projectId, "tickets", ticketId));
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function deleteProject(projectId) {
  try {
    return await deleteDoc(doc(db, "projects", projectId));
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function editTicket(projectId, ticketId, data) {
  try {
    const ref = doc(db, `projects/${projectId}/tickets/${ticketId}`);
    await updateDoc(ref, {
      ...data,
      modifiedDate: new Date().toISOString(),
    });

    await setModificationDate(projectId);
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function editProject(projectId, data, users) {
  try {
    const ref = doc(db, `projects/${projectId}`);
    await updateDoc(ref, {
      ...data,
      modifiedDate: new Date().toISOString(),
    });

    const ticketsSnapShot = await getDocs(
      collection(db, `projects`, projectId, "tickets")
    );

    const ticketdata = ticketsSnapShot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    ticketdata.forEach(async (ticket) => {
      ticket.members.forEach(async (user, index) => {
        const found = users.some((el) => el.id === user.id);
        if (!found) {
          const ref = doc(db, "projects", projectId, "tickets", ticket.id);
          const ticketData = await getDoc(ref);
          const newMembersList = ticketData
            .data()
            .members.filter((el) => el.id !== user.id);

          await updateDoc(ref, {
            ...ticketData.data(),
            members: newMembersList,
          });
        }
      });
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function getUserTickets(projectId, userId, setState) {
  return onSnapshot(
    collection(db, `projects`, projectId, "tickets"),
    (snapshot) => {
      const data = snapshot.docs
        .map((snap) => {
          const found = snap.data().members.some((user) => user.id === userId);
          if (found) {
            return {
              id: snap.id,
              ...snap.data(),
            };
          }
          return null;
        })
        .filter((el) => el);
      setState((prevVal) => [...prevVal, ...data]);
    }
  );
}

export async function returnUserTickets(userId, setState) {
  return onSnapshot(collection(db, `projects`), (snapshot) => {
    snapshot.docs.map((snap) => {
      const found = snap.data().members.some((user) => user.id === userId);
      if (found) {
        getUserTickets(snap.id, userId, setState);
      }
    });
    //setState(data);
  });
}

export async function deleteUser(uid) {
  try {
    await getAuth().deleteUser(uid);
  } catch (error) {
    throw new Error(error.message);
  }
}
