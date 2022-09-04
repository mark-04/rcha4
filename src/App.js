import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import { ProductList } from "./ProductList/ProductList";

export const GlobalContext = React.createContext();

function initGlobalContext() {
  return {
    isUserLogedIn: false,
    showLoginPrompt: false,
    cart: {},
  };
}

function App() {
  const [glob, setGlob] = useState(initGlobalContext);
  const globalContext = { glob, setGlob };

  return (
    <GlobalContext.Provider value={globalContext}>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<ProductList />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
