const apiFetch = async (url, method, data) => {
  const r = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  if (r.ok) return r.json();

  throw new Error(r.statusText);
};

export { apiFetch };
