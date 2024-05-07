import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const parseData = (data) => {
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
    }
  };

  const userData = parseData(localStorage.getItem("userData"));

  const [user, setUser] = useState(userData ? userData.user : null);
  const [token, setToken] = useState(userData ? userData.token : "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch("your-api-endpoint/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            user: res.data.user,
            token: res.token,
          }),
        );
        navigate("/home");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
