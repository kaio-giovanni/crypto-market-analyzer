import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./pages/Home";
import LoginAuth0 from "./pages/Login/LoginAuth0";
import Exchanges from "./pages/Exchanges";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/home" exact={true} element={<Home />} />
          <Route path="exchanges" exact={true} element={<Exchanges />} />
          <Route path="login" exact={true} element={<LoginAuth0 />} />
          <Route path="unauthorized" exact={true} element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
