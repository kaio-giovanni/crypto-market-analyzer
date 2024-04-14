import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redirecting user... " + Date.now());
    const timerId = setTimeout(() => {
      navigate("/login");
    }, 5000);
    clearTimeout(timerId);
  }, [navigate]);
};

export default Unauthorized;
