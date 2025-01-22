import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import "./index.css";
import { AuthStatus, useAuth } from "./hooks/useAuth.js";
import { Spinner } from "react-bootstrap";

function App() {
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
