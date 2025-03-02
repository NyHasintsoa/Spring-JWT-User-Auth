import Cookies from "js-cookie";
import { TOKEN_COOKIE } from "../config/constant.js";

const getConversationsFor = async (userId) => {
  const r = await fetch(`/api/messages/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`
    }
  });
  if (r.ok) return r.json();
  throw new Error("Forbidden");
}

const writeMessage = async (data, userId) => {
  const r = await fetch(`/api/messages/${userId}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`
    }
  })
  if (r.ok) return r.json()
  throw new Error("Forbidden")
}

export { getConversationsFor, writeMessage }