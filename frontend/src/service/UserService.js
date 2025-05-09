import Cookies from "js-cookie";
import { BACKEND_URL, TOKEN_COOKIE } from "../config/constant.js";

const getAllUsers = async () => {
  const r = await fetch("/api/users", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`
    }
  });
  if (r.ok) return r.json();
  throw new Error("Error");
};

const getPaginatedUsers = async (page = 0, size = 10) => {
  const url = new URL(`${BACKEND_URL}/api/users/paginate`)
  url.searchParams.set("page", page)
  url.searchParams.set("size", size)
  const r = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`
    }
  });
  if (r.ok) return r.json();
  throw new Error("Error");
}

const getUserById = async (userId) => {
  const r = await fetch(`/api/users/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`
    }
  });
  if (r.ok) return r.json();
  throw new Error("Error");
}

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
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`
    }
  });
  if (r.ok) return r.json();
  throw new Error("Error");
};

const addUserByAdmin = async (data) => {
  const r = await fetch("/api/users/add", {
    method: "POST",
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

export {
  getAllUsers,
  getPaginatedUsers,
  getUserById,
  updateProfileRequest,
  uploadProfileImageRequest,
  addUserByAdmin
};
