import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5vHlQ4sll-c44Pk4cYlOPUvINSF9J1Fs",
  authDomain: "dudra-9564b.firebaseapp.com",
  projectId: "dudra-9564b",
  storageBucket: "dudra-9564b.firebasestorage.app",
  messagingSenderId: "606382717187",
  appId: "1:606382717187:web:850f1316fc8a5d5e459136",
  measurementId: "G-75NJ2PG7PZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, doc, setDoc, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };