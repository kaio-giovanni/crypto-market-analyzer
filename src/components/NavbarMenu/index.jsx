import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import Logo from "../../assets/logo.png";

const NavbarMenu = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const userAuth = useAuth();

  return (
    <React.Fragment>
      <div className="flex flex-wrap place-items-center">
        <section className="relative mx-auto">
          <nav
            className="flex justify-between bg-gray-900 text-white w-screen"
            role="navigation"
          >
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <Link
                to="/home"
                replace={true}
                className="text-3xl font-bold font-heading"
              >
                <img className="h-9" src={Logo} alt="logo" />
              </Link>
              <Link
                to="/login"
                replace={true}
                className="font-bold font-heading px-5 hover:text-gray-200"
              >
                Stock Market Analyzer
              </Link>
              <div
                className={`${
                  toggleMenu ? "block" : "hidden"
                } xl:hidden mx-auto`}
              >
                <ul className="flex flex-col items-center justify-center text-center">
                  <li>
                    <Link
                      to="/home"
                      replace={true}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      to="/home"
                      replace={true}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 hover:text-gray-200 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <small className="mx-2">Olá, {userAuth?.user.name}</small>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="hidden xl:flex ml-auto items-center space-x-5 items-center">
                <Link
                  to="/home"
                  replace={true}
                  className="flex items-center hover:text-gray-200"
                >
                  <small className="mx-2">Olá, {userAuth?.user.name}</small>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <button
              className="navbar-burger self-center mr-12 xl:hidden"
              onClick={() => setToggleMenu((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>
        </section>
      </div>
    </React.Fragment>
  );
};

export default NavbarMenu;
/**
 * 
 * <div className={`${toggleMenu ? "block" : "hidden"}`}>
                <ul className="xl:hidden px-4 mx-auto font-semibold font-heading space-x-12">
                  <li>
                    <Link
                      to="/home"
                      replace={true}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    ></Link>
                  </li>
                </ul>
              </div>

              {/* 
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 items-center">
                  <a
                    href="#home"
                    
                  >
                    Home
                  </a>
                  <a
                    href="#about"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    About
                  </a>
                  <a
                    href="#services"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Services
                  </a>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Contact
                  </a>
                </div>
              </div> }
 * 
 */
