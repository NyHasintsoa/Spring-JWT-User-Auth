import axios from "axios";

export const loginRequest = (request) => {
  return fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};

export const loginAxios = async (request) => {
  return await axios.post("/api/auth/login", request, {
    headers:{
      'Content-type' : 'application/json'
    }
  })
}