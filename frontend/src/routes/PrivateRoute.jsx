import { Navigate } from "react-router-dom";
import { AuthStatus, useAuth } from "../hooks/useAuth.js";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const { status } = useAuth();
  if (status == AuthStatus.Guest)
    return (
      <>
        <Navigate to={"/login"} replace={true} />
      </>
    );
  return children;
}

export default PrivateRoute;
