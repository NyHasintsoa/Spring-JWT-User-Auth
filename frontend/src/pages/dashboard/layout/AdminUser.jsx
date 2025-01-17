import React from "react";
import { Dropdown, Navbar } from "react-bootstrap";
import { FaCogs, FaList, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext.jsx";
import {Link} from "react-router-dom";

const AdminUser = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <Dropdown className="nav-item no-arrow">
          <Dropdown.Toggle className="nav-link" as={"a"} href="#">
            <span className="mr-2 d-none d-lg-inline text-light small">
              Douglas McGee
            </span>
            <img
              className="img-profile rounded-circle ms-1"
              src={`/src/assets/profile/undraw_profile.svg`}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-right">
            <Link to={"/admin/profile"} className={"dropdown-item"}>
              <FaUser />
              <span className="ms-2">Profile</span>
            </Link>
            <Dropdown.Item>
              <FaCogs />
              <span className="ms-2">Settings</span>
            </Dropdown.Item>
            <Dropdown.Item>
              <FaList />
              <span className="ms-2">Activity Log</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>
              <FaSignOutAlt />
              <span className="ms-2">Logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    </>
  );
};

export default AdminUser;
