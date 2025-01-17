import React from "react";
import Cookies from "js-cookie";

function Dashboard() {
  const tokenCookie = Cookies.get("token_user");
  return (
    <div>
      <h1>Token '==' {tokenCookie ?? "No TokenCookie"} </h1>
    </div>
  );
}

export default Dashboard;
