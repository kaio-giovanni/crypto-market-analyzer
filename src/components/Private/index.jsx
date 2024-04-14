import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const Private = (props) => {
  const { user, token } = useAuth();
  if (user == null || !token) {
    return <Navigate to="/login" />;
  } else {
    return <>{props.children}</>;
  }
};

export default Private;
