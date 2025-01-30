import Cookies from "js-cookie";
import { TOKEN_COOKIE } from "../config/constant.js";

const loginRequest = async (data) => {
  const r = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  if (r.ok) return r.json();
  throw new Error("Forbidden");
};

const getCurrentUser = () => {
  return fetch("/api/users/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`
    }
  });
};

const registerRequest = async (data) => {
  const r = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  if (r.ok) return r.json();
  throw new Error("Forbidden");
};

export { loginRequest, getCurrentUser, registerRequest };
