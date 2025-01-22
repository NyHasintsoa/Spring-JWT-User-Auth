import { Component } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";
import UserDropDown from "./UserDropDown.jsx";
import DashboardSidebar from "./DashboardSidebar.jsx";
import "../../assets/css/sidebar.css";

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggled: false
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({
      sidebarToggled: !this.state.sidebarToggled
    });
  }

  render() {
    return (
      <>
        <div
          className={`sidebar-nav-fixed ${
            !this.state.sidebarToggled ? "" : "sidebar-sidenav-toggled"
          }`}
        >
          <nav className="sidebar-topnav navbar navbar-expand navbar-dark text-bg-dark">
            <a className="navbar-brand ps-3" href="index.html">
              Sidebar Bootstrap
            </a>
            <button
              onClick={this.toggleSidebar}
              className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
              id="sidebarToggle"
            >
              <FaBars size={20} />
            </button>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search for..."
                  aria-label="Search for..."
                  aria-describedby="btnNavbarSearch"
                />
                <button
                  className="btn btn-primary"
                  id="btnNavbarSearch"
                  type="button"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
            <UserDropDown />
          </nav>
          <div id="layoutSidenav">
            <DashboardSidebar />
            <div id="layoutSidenav_content">
              <main className="mt-5 pt-1">
                <div className="container-fluid px-4">
                  <Outlet />
                </div>
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DashboardLayout;
