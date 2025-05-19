import "./App.css";
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




function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
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

  return (
    <div className="App">
      <Navbar setSearchTerm={setSearchTerm} />
      <AllRoutes searchTerm={searchTerm} />
    </div>
  );
}

export default App;
