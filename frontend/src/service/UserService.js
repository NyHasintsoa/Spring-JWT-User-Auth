import Cookies from "js-cookie";
import { TOKEN_COOKIE } from "../config/constant.js";

const updateProfileRequest = async (data) => {
  const r = await fetch("/api/users/profile", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`
    }
  });
  if (r.ok) return r.json();
  throw new Error("Error");
};

const uploadProfileImageRequest = async (data) => {
  const r = await fetch("/api/users/profile/upload", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`
    }
  });
  if (r.ok) return r.json();
  throw new Error("Error");
};

export { updateProfileRequest, uploadProfileImageRequest };
