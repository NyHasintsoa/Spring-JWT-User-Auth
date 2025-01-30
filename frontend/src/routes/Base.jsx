import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthStatus, useAuth } from "../hooks/useAuth.js";
import { Spinner } from "react-bootstrap";

function Base() {
  const { status } = useAuth();
  if (status === AuthStatus.Unknown) {
    return (
      <>
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Spinner
            variant="primary"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position={"top-right"} reverseOrder={false} gutter={10} />
      <Outlet />
    </>
  );
}

export default Base;
