import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./hooks/AuthProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Exchanges from "./pages/Exchanges";
import NotFound from "./pages/NotFound";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/home" exact={true} element={<Home />} />
          <Route path="exchanges" exact={true} element={<Exchanges />} />
          <Route path="login" exact={true} element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
