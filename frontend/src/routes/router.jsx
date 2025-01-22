import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import Base from "./Base.jsx";
import ErrorPage from "../pages/errors/error-page.jsx";
import ForgotPassword from "../pages/forgot_password/ForgotPassword.jsx";
import UpdatePassword from "../pages/forgot_password/UpdatePassword.jsx";
import Home from "../pages/home/Home.jsx";
import Test from "../pages/test/Test.jsx";
import TestNext from "../pages/test/TestNext.jsx";
import About from "../pages/about/About.jsx";

const router = createBrowserRouter([
  {
    path: "",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Base />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "about",
            element: <About />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />
          },
          {
            path: "update-password",
            element: <UpdatePassword />
          },
          {
            path: "test",
            element: <Test />
          },
          {
            path: "test-next",
            element: <TestNext />
          }
        ]
      }
    ]
  }
]);

export default router;
