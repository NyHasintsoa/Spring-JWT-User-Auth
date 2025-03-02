import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const About = () => {

  return (
    <>
      <Header />
      <div className="m-5 min-vh-100">
        <ButtonGroup>
          <Link to={"/private-socket"} className="btn btn-success">
            Private Socket
          </Link>
          <Link to={"/private-socket"} className="btn btn-primary">
            Public Socket
          </Link>
        </ButtonGroup>
      </div>
      <Footer />
    </>
  );
};

export default About;
