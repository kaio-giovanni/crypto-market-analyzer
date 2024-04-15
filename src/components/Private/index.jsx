import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";

const Private = (props) => {
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log("Checking user credentials...");
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default Private;
