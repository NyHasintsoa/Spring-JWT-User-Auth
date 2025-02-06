import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import DashboardSidebar from "./DashboardSidebar.jsx";
import "../../assets/css/sidebar.css";
import { Toaster } from "react-hot-toast";
import { AuthStatus, useAuth } from "../../hooks/useAuth.js";
import { Spinner } from "react-bootstrap";
import UserDropDown from "../userDropdown/UserDropdown.jsx";

function DashboardLayout() {
  const { status } = useAuth();
  const [sidebarToggled, setSidebarToggled] = useState(false);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

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
      <div
        className={`sidebar-nav-fixed ${
          !sidebarToggled ? "" : "sidebar-sidenav-toggled"
        }`}
      >
        <nav className="sidebar-topnav navbar navbar-expand navbar-dark text-bg-dark">
          <a className="navbar-brand ps-3" href="index.html">
            Sidebar Bootstrap
          </a>
          <button
            onClick={toggleSidebar}
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
          >
            <FaBars size={20} />
          </button>
          <div className="ms-auto"></div>
          <UserDropDown />
        </nav>
        <div id="layoutSidenav">
          <DashboardSidebar />
          <div id="layoutSidenav_content">
            <main className="mt-5 pt-1">
              <div className="container-fluid p-4">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
