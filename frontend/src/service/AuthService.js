import axios from "axios";

export const loginRequest = (request) => {
  fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  return []
}

export const loginAxios = (request) => {
  return axios.post("/api/auth/login", request, {
    headers:{
      'Content-type' : 'application/json'
    }
  })
}
