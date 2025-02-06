import { Dropdown, Navbar } from "react-bootstrap";
import { FaList, FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PROFILE_IMAGE_PATH } from "../../config/constant.js";
import { useAuth } from "../../hooks/useAuth.js";
import defaultProfile from "../../assets/profile/default_profile.svg";

const UserDropDown = () => {
  const { logoutUser, account } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <Dropdown align={"end"} className="nav-item no-arrow">
          <Dropdown.Toggle
            role="button"
            className="nav-link p-0"
            as={"a"}
            href="#"
          >
            <img
              className="avatar-sm rounded-circle ms-1"
              src={
                account.profileImage == null
                  ? defaultProfile
                  : PROFILE_IMAGE_PATH + account.profileImage
              }
            />
          </Dropdown.Toggle>
          <Dropdown.Menu align={"end"} as={"ul"} className="pt-3">
            <li className="px-3 mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <img
                    className="img-profile rounded-circle shadow"
                    src={
                      account.profileImage == null
                        ? defaultProfile
                        : PROFILE_IMAGE_PATH + account.profileImage
                    }
                  />
                </div>
                <div>
                  <Link
                    to={"/profile"}
                    className="text-decoration-none text-dark fw-bold fs-6 mt-2 mt-sm-0"
                  >
                    {account.fullname}
                  </Link>
                  <p className="small m-0">{account.email}</p>
                </div>
              </div>
            </li>
            <li>
              <Dropdown.Divider />
            </li>
            <li>
              <Link to={"/list"} className="dropdown-item">
                <FaList className="fa-fw me-2" /> List
              </Link>
            </li>
            <li>
              <Link to={"/list"} className="dropdown-item">
                <FaList className="fa-fw me-2" /> List
              </Link>
            </li>
            <li>
              <Link to={"/list"} className="dropdown-item">
                <FaList className="fa-fw me-2" /> List
              </Link>
            </li>
            <li>
              <Link to={"/list"} className="dropdown-item">
                <FaList className="fa-fw me-2" /> List
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="dropdown-item"
              >
                <FaPowerOff className="fa-fw me-2" /> Se déconnecter
              </button>
            </li>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    </>
  );
};

export default UserDropDown;
