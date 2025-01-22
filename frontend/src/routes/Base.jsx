import { Outlet } from "react-router-dom";
import {Toaster} from "react-hot-toast";

function Base() {
  return (
    <>
      <Toaster
        position={"top-right"}
        reverseOrder={false}
        gutter={10}
      />
      <Outlet />
    </>
  );
}

export default Base;
