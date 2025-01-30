import { Container, Nav, Navbar } from "react-bootstrap";
import springLogo from "../..//assets/image/spring-logo.png";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useAccountStore } from "../../store/authStore.js";
import UserDropDown from "../userDropdown/UserDropdown.jsx";

const links = [
  {
    to: "/",
    name: "Home"
  },
  {
    to: "/about",
    name: "About"
  },
  {
    to: "/contact",
    name: "Contact"
  },
  {
    to: "/test",
    name: "Test"
  }
];

const Header = () => {
  const { account } = useAccountStore();

  return (
    <>
      <Navbar expand={"md"}>
        <Container>
          <Navbar.Brand>
            <img src={springLogo} alt={"Spring Logo"} width={50} />
            <span className={"fw-bold ms-3"}>Spring Project</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={"navbar-nav"} />
          <Navbar.Collapse id={"navbar-nav"}>
            <Nav className={"mx-auto"}>
              {links.map((link, index) => (
                <Link to={link.to} key={index} className="nav-link">
                  {link.name}
                </Link>
              ))}
            </Nav>
            {account ? (
              <>
                <UserDropDown />
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  replace
                  className={"btn btn-outline-success"}
                >
                  Se connecter
                  <FaSignInAlt size={20} className={"ms-3"} />
                </Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
