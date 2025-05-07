import "./App.css";
import React, { useState } from "react";
import Footer from "./Components/Pages/Footer";
import Navbar from "./Components/Pages/Navbar";
import Shop from "./Components/ProductsPage/ProductPage";
import AllRoutes from "./Components/Roouters/AllRoutes";


function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <Navbar setSearchTerm={setSearchTerm} />
      <AllRoutes searchTerm={searchTerm} />
    </div>
  );
}

export default App;
