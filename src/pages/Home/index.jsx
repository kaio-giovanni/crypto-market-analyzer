import React from "react";
import { Navigate } from "react-router-dom";
import NavbarMenu from "../../components/NavbarMenu";
import { useAuth } from "../../hooks/AuthProvider";

const Home = () => {
  const { user, token } = useAuth();
  if (user == null || !token) {
    return <Navigate to="/login" />;
  } else {
    return <NavbarMenu />;
  }
};

export default Home;
