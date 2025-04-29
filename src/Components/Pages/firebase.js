// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5vHlQ4sll-c44Pk4cYlOPUvINSF9J1Fs",
    authDomain: "dudra-9564b.firebaseapp.com",
    projectId: "dudra-9564b",
    storageBucket: "dudra-9564b.firebasestorage.app",
    messagingSenderId: "606382717187",
    appId: "1:606382717187:web:850f1316fc8a5d5e459136",
    measurementId: "G-75NJ2PG7PZ"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export the instance
const db = getFirestore(app);

const storage = getStorage(app);

export { app, db, storage };