import {Container, Nav, Navbar} from "react-bootstrap";
import springLogo from "../../assets/image/spring-logo.png"
import {Link} from "react-router-dom";
import {FaSignInAlt} from "react-icons/fa";
import "./header.css"

const Header = () => {
  return (
    <>
      <Navbar expand={"lg"}>
        <Container>
          <Navbar.Brand>
            <img
              src={springLogo}
              alt={"Spring Logo"}
              width={50}
            />
            <span className={"fw-bold ms-3"}>Spring Project</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={"navbar-nav"}/>
          <Navbar.Collapse id={"navbar-nav"}>
            <Nav className={"mx-auto"}>
              {/*<NavDropdown title={"nav-dropdown"} id={"navbar-dropdown"}>*/}
              {/*  <NavDropdown.Item href={"#"}>Action</NavDropdown.Item>*/}
              {/*  <NavDropdown.Item href={"#"}>Action</NavDropdown.Item>*/}
              {/*  <NavDropdown.Divider/>*/}
              {/*  <NavDropdown.Item href={"#"}>Action</NavDropdown.Item>*/}
              {/*</NavDropdown>*/}
              <Nav.Link href={"/"}>Home</Nav.Link>
              <Nav.Link href={"/about"}>About</Nav.Link>
              <Nav.Link href={"/test"}>Test</Nav.Link>
            </Nav>
            <Link to={"/login"} className={"btn btn-outline-success"}>
              Se connecter
              <FaSignInAlt size={20} className={"ms-3"}/>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header