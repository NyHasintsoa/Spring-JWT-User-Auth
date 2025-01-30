import { Container } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";

const ErrorPage = () => {
  const error = useRouteError();

  console.log(error);

  return (
    <>
      <Header />
      <main>
        <Container>
          <section className="my-5 d-flex flex-column align-items-center">
            <h1
              className="mb-0 fw-bolder text-primary"
              style={{ fontSize: "180px" }}
            >
              {error.status}
            </h1>
            <h2 className="text-center fw-semibold">{error.statusText}</h2>
            <Link to={"/"} className="btn btn-secondary">
              Back to Home
            </Link>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;
