import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redirecting user... " + Date.now());
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  }, [navigate]);

  return (
    <div className="bg-midnight text-white text-center py-20 h-screen w-full">
      <h1 className="mb-4 text-6xl font-semibold text-red-500">403</h1>
      <p className="mb-4 text-lg text-gray-600">Oops! Voce não tem acesso a essa página!</p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-gray-600">
        Você será redirecionado para a página de Login em instantes!
      </p>
    </div>
  );
};

export default Unauthorized;
