import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-midnight text-white text-center py-20 h-screen w-full">
      <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
      <p className="mb-4 text-lg text-gray-600">Oops! Parece que você está perdido.</p>
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
        Vamos levar você de volta, clique no link para ir para a página inicial
        <Link to="/home" replace={true} className="text-blue-500 m-2">
          home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
