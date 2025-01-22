import { useState } from "react";
import Header from "../../components/Header.jsx";

const About = () => {
  const [number, setNumber] = useState(0);

  const handleClick = (event) => {
    event.preventDefault();
    setNumber((n) => n + 1);
  };

  return (
    <>
      <Header />
      <div className="m-5">
        <button
          onClick={handleClick}
          className="btn btn-lg btn-outline-primary"
        >
          Increment Number : {number}
        </button>
      </div>
    </>
  );
};

export default About;
