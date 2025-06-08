import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { allProducts } from '../ProductsPage/allprooducts';

// const firebaseConfig = {
//   apiKey: "AIzaSyD5vHlQ4sll-c44Pk4cYlOPUvINSF9J1Fs",
//   authDomain: "dudra-9564b.firebaseapp.com",
//   projectId: "dudra-9564b",
//   storageBucket: "dudra-9564b.firebasestorage.app",
//   messagingSenderId: "606382717187",
//   appId: "1:606382717187:web:850f1316fc8a5d5e459136",
//   measurementId: "G-75NJ2PG7PZ"
// };


const firebaseConfig = {

  apiKey: "AIzaSyCVSNfUA0gwqYi0B9MMPmu9oinAjEgLAcY",

  authDomain: "dudra-786.firebaseapp.com",

  projectId: "dudra-786",

  storageBucket: "dudra-786.firebasestorage.app",

  messagingSenderId: "974652300138",

  appId: "1:974652300138:web:7f9d8dec91ad03eb13a313",

  measurementId: "G-9FTN4MF30S"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


async function uploadProducts() {
  try {
    // Flatten all products from Brands and other categories
    const allProductsArray = [
      ...Object.values(allProducts.Brands).flat(),
      ...Object.values(allProducts).filter(Array.isArray).flat()
    ];

    // Remove duplicates based on id
    const uniqueProducts = Array.from(
      new Map(allProductsArray.map(product => [product.id, product])).values()
    );

    // Upload each product to Firestore
    for (const product of uniqueProducts) {
      await setDoc(doc(db, 'products', product.id), product);
      console.log(`Uploaded product: ${product.name}`);
    }
    console.log('All products uploaded successfully');
  } catch (error) {
    console.error('Error uploading products:', error);
  }
}

uploadProducts();

export { app, auth, db, doc, setDoc, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };