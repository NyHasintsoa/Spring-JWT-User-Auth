const sendContactMessage = async (data) => {
  const r = await fetch("/api/contact/send", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  if (r.ok) return r.json();
  throw new Error("Error");
};

export { sendContactMessage };
