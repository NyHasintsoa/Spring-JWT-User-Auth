import { Button, Card, CardBody, CardHeader, Container } from "react-bootstrap";
import Footer from "../../components/footer/Footer.jsx";
import Header from "../../components/header/Header.jsx";
import { FaSlidersH } from "react-icons/fa";
import ProfileImageCard from "./ProfileImageCard.jsx";
import ProfileInfoCard from "./ProfileInfoCard.jsx";
import ProfilePasswordCard from "./ProfilePasswordCard.jsx";

const Profile = () => {
  return (
    <>
      <Header />
      <main className="pt-3">
        <Container fluid>
          <div className="row">
            <div className="col-lg-4 col-xl-3"></div>
            <div className="col-lg-8 col-xl-9">
              <div className="d-grid mb-0 w-100">
                <Button
                  type="button"
                  variant="primary"
                  className="mb-4 fs-5 fw-semibold pb-2"
                >
                  <FaSlidersH /> Menu
                </Button>
                <div className="d-flex flex-column gap-4">
                  <Card>
                    <CardHeader>
                      <h4 className="mb-0">Personal Information</h4>
                    </CardHeader>
                    <CardBody>
                      <ProfileImageCard />
                      <ProfileInfoCard />
                    </CardBody>
                  </Card>

                  <ProfilePasswordCard />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
