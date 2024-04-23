import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading";
import Logo from "../../assets/logo.png";

const LoginAuth0 = () => {
  const { loginWithRedirect } = useAuth0();
  const [loading] = useState(false);

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-indigo-900 text-black h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
        <div className="bg-blue-gray-600 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <img src={Logo} alt="logo" className="h-9" />
        </div>
        <form className="p-12 md:p-24">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <p className="text-lg font-bold text-black">Bem vindo !</p>
          </div>
          <button
            onClick={() => loginWithRedirect()}
            className="bg-purple text-white from-gray-700 to-gray-900 font-medium p-2 md:p-4 uppercase w-full rounded"
          >
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAuth0;
