import React from "react";

const Footer = () => {
  return (
    <div className="relative bottom-0 left-0 w-full h-10 bg-indigo-900 text-white text-center mx-auto p-2 mt-10 rounded-none border border-solid border-indigo-500">
      <span className="font-sans text-xs">
        © {new Date().getFullYear()} Direitos Reservados - Feito por @Kaio
      </span>
    </div>
  );
};

export default Footer;
