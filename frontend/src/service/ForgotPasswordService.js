const forgotPassword = (request) => {
  return fetch("/api/forgot-password", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};

const updatePassword = (request) => {
  return fetch("/api/forgot-password/update-password", {
    method: "PUT",
    body: JSON.stringify(request),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};

const checkTokenValidity = (token) => {
  console.log(token);
  return true;
};

export { forgotPassword, updatePassword, checkTokenValidity };
