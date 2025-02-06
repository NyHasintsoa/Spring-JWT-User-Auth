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

const checkTokenValidity = (data) => {
  return fetch("/api/forgot-password/check-validity", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json"
    }
  });
};

export { forgotPassword, updatePassword, checkTokenValidity };
