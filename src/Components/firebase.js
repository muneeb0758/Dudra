import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

import { getFirestore, doc, setDoc } from "firebase/firestore"; // Added imports

const firebaseConfig = {
  apiKey: "AIzaSyDZx0ym00-FhOwaUYHRVTfj8Vshqm9pY6Y",
  authDomain: "dudra-2bc28.firebaseapp.com",
  projectId: "dudra-2bc28",
  storageBucket: "dudra-2bc28.firebasestorage.app",
  messagingSenderId: "1086832857446",
  appId: "1:1086832857446:web:444be9eaa4e2e1d42078a7",
  measurementId: "G-RQ5DJ4ZHKM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export all needed Firebase features
export { auth, db, doc, setDoc };