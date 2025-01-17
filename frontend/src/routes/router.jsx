import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import Base from "./Base.jsx";
import DashboardLayout from "../pages/dashboard/layout/DashboardLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ErrorPage from "../pages/errors/error-page.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ForgotPassword from "../pages/forgot_password/ForgotPassword.jsx";
import UpdatePassword from "../pages/forgot_password/UpdatePassword.jsx";
import Home from "../pages/home/Home.jsx";
import Profile from "../pages/profile/Profile.jsx";
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
            element: <Home/>
          },
          {
            path: "about",
            element: <About/>
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
            element: <ForgotPassword/>
          },
          {
            path: "update-password",
            element: <UpdatePassword/>
          },
          {
            path: "test",
            element: <Test/>
          },
          {
            path: "test-next",
            element: <TestNext/>
          },
          {
            path: "admin",
            element: (
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            ),
            children: [
              { index: true, element: <Dashboard /> },
              {
                path: "",
                element: <h1>Hello Home</h1>
              },
              {
                path: "profile",
                element: <Profile/>
              },
              {
                path: "user",
                element: <h1>Hello User</h1>
              }
            ]
          }
        ]
      }
    ]
  }
]);

export default router;
