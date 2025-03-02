import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/register.jsx";
import Base from "./Base.jsx";
import ErrorPage from "../pages/errors/error-page.jsx";
import ForgotPassword from "../pages/forgot_password/ForgotPassword.jsx";
import UpdatePassword from "../pages/forgot_password/UpdatePassword.jsx";
import Home from "../pages/home/Home.jsx";
import Test from "../pages/test/Test.jsx";
import About from "../pages/about/About.jsx";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import ListUser from "../pages/admin/user/ListUser.jsx";
import Profile from "../pages/profile/Profile.jsx";
import Contact from "../pages/contact/Contact.jsx";
import Dashboard from "../pages/admin/dashboard/Dashboard.jsx";
import UserDetail from "../pages/admin/userDetail/UserDetail.jsx";
import AddUser from "../pages/admin/userAdd/AddUser.jsx";
import ChatLayout from "../components/chat/chatLayout/ChatLayout.jsx";
import ChatMain from "../pages/chat/main/ChatMain.jsx";
import PublicSocket from "../pages/test/webSocket/PublicSocket.jsx";
import PrivateSocket from "../pages/test/webSocket/PrivateSocket.jsx";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Base />,
        children: [
          {index: true, element: <Home />},
          {
            path: "about",
            element: <About />
          },
          {
            path: "contact",
            element: <Contact />
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
            path: "profile",
            element: <Profile />
          },
          {
            path: "test",
            element: <Test />
          }
        ]
      }
    ]
  },
  {
    path: "admin",
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "users",
            element: <ListUser />
          },
          {
            path: "users/details/:userId",
            element: <UserDetail />
          },
          {
            path: "users/add",
            element: <AddUser />
          }
        ]
      }
    ]
  },
  {
    path: "chat",
    element: <ChatLayout />,
    children: [
      {
        path: "",
        element: <ChatMain />
      },
      {
        path: ":userId",
        element: <ChatMain />
      },
    ]
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
    path: "public-socket",
    element: <PublicSocket />
  },
  {
    path: "private-socket",
    element: <PrivateSocket />
  }
]);

export default router;
