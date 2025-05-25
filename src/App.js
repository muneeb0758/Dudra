import "./App.css";
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Navbar from "./Components/Pages/Navbar.jsx";
=======
import React, { useState } from "react";
import Footer from "./Components/Pages/Footer";
import Navbar from "./Components/Pages/Navbar";
import Shop from "./Components/ProductsPage/ProductPage";
import AllRoutes from "./Components/Roouters/AllRoutes";
import { USER_LOGIN_SUCCESS } from '../src/Components/Redux/auth/auth.actions';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from './Components/firebase'; // Adjust path if necessary


>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221

import AllRoutes from "./Components/Roouters/AllRoutes.jsx";
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Components/firebase'; // Correct path based on your structure
import { loginSuccess } from './Components/Redux/auth/auth.reducer'; // Corrected import

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
<<<<<<< HEAD
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginSuccess({
          username: user.displayName || user.email.split('@')[0],
          email: user.email,
          uid: user.uid
        }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
=======
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          email: user.email,
          username: user.displayName || '', // if using displayName
        }
      });
    }
  });

  return () => unsubscribe();
}, []);
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221

  return (
    <div className="App">
      <Navbar setSearchTerm={setSearchTerm} />
      <AllRoutes />
    </div>
  );
}

export default App;