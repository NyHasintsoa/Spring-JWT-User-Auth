import { Outlet } from "react-router-dom";
import AuthContextProvider from "../context/AuthContext.jsx";
import {Toaster} from "react-hot-toast";

function Base() {
  return (
    <>
      <AuthContextProvider>
        <Toaster
          position={"top-right"}
          reverseOrder={false}
          gutter={10}
        />
        <Outlet />
      </AuthContextProvider>
    </>
  );
}

export default Base;
