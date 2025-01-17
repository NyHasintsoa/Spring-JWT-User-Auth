import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoute({ children }) {
  const tokenCookie = Cookies.get("token_user")
  if (tokenCookie == null)
  return (
    <>
      <Navigate to={"/login"} replace={true} />
    </>
  );
  return children;
}

export default PrivateRoute;