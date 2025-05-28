import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./Components/Pages/Navbar.jsx";

import AllRoutes from "./Components/Roouters/AllRoutes.jsx";
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Components/firebase'; // Correct path based on your structure
import { loginSuccess } from './Components/Redux/auth/auth.reducer'; // Corrected import

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
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

  return (
    <div className="App">
      <Navbar setSearchTerm={setSearchTerm} />
      <AllRoutes />
    </div>
  );
}

export default App;