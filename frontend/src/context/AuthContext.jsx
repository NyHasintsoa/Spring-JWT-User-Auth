import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../service/AuthService.js";
import Cookies from "js-cookie";

const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null)

  const login = async (request) => {
    await loginRequest(request).then((response) => {
      try {
        if (response.ok) {
          response.json().then((data) => {
            setToken(data.data.token)
            // Cookies.set("token_user", data.data.token);
            // navigate("/admin", {
            //   replace: true
            // })
          })
        } else throw new Error("Nothing to show");
      } catch (error) {
        console.log(error.message)
      }
    })
  }

  const logout = () => {
    try {
      Cookies.remove("token_user");
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/login", {
        replace: true
      });
    }
  };

  const isUserAuthenticated = () => {
    let tokenCookie = Cookies.get("token_user");
    if (tokenCookie != null && token == null) {
      setToken(token)
      console.log("###################################")
      console.log("Wait until I've been here")
      console.log("###################################")
      console.log("###################################")
      console.log("TokenContext => "+token)
      console.log("tokenCookie => "+tokenCookie.slice(0, 55))
      console.log("###################################")
    }
  };

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  const value = {
    userInfo,
    login,
    logout,
    token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider