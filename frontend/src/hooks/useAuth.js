import { useCallback, useEffect } from "react";
import { useAccountStore } from "../store/authStore.js";
import {
  getCurrentUser,
  loginRequest,
  registerRequest
} from "../service/AuthService.js";
import Cookies from "js-cookie";
import { TOKEN_COOKIE } from "../config/constant.js";
import {} from "js-cookie";
import { useNavigate } from "react-router-dom";
import { wait } from "../utils/Utils.js";
import toast from "react-hot-toast";

const AuthStatus = {
  Unknown: 0,
  Authenticated: 1,
  Guest: 2
};

/**
 * Hook to user authentication
 * @return {Object}
 */
const useAuth = () => {
  const { account, setAccount } = useAccountStore();
  const navigate = useNavigate();

  let status;
  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const authenticate = useCallback(async () => {
    await wait();
    if (status === AuthStatus.Guest || status === AuthStatus.Unknown) {
      getCurrentUser()
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Unauthorized");
        })
        .then((data) => {
          setAccount(data.data);
        })
        .catch(() => {
          setAccount(null);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = useCallback((data) => {
    loginRequest(data)
      .then(async (response) => {
        Cookies.set(TOKEN_COOKIE, response.data.token, {
          expires: 1 / 24
        });
        await toast.promise(authenticate(), {
          loading: "Traitement",
          success: "Authentication success",
          error: (error) => `Error: ${error}`
        });
        navigate("/", {
          replace: true
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = useCallback((data) => {
    registerRequest(data)
      .then(async (response) => {
        Cookies.set(TOKEN_COOKIE, response.data.token, {
          expires: 1 / 24
        });
        await toast.promise(authenticate(), {
          loading: "Traitement",
          success: "Authentication success",
          error: (error) => `Error: ${error}`
        });
        navigate("/", {
          replace: true
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      status === AuthStatus.Unknown ||
      (account == undefined && Cookies.get(TOKEN_COOKIE) != undefined)
    ) {
      authenticate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutUser = useCallback(() => {
    Cookies.remove(TOKEN_COOKIE);
    setAccount(null);
    navigate("/", {
      replace: true
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    account,
    status,
    authenticate,
    loginUser,
    logoutUser,
    registerUser
  };
};

export { useAuth, AuthStatus };
