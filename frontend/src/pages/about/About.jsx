import { useState } from "react";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";

const About = () => {
  const [number, setNumber] = useState(0);

  const handleClick = (event) => {
    event.preventDefault();
    setNumber((n) => n + 1);
  };

  return (
    <>
      <Header />
      <div className="m-5 min-vh-100">
        <button
          onClick={handleClick}
          className="btn btn-lg btn-outline-primary"
        >
          Increment Number : {number}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default About;
