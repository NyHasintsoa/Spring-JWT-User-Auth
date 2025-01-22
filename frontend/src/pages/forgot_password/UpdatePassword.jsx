import { Button, Card, Container, Spinner } from "react-bootstrap";
import SpringLogo from "../../assets/image/spring-logo.png";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePassword } from "../../service/ForgotPasswordService.js";

const UpdatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tokenUser = queryParams.get("token");
  const options = {
    required: "Ce champ ne doit pas être vide !",
    minLength: {
      value: 5,
      message: "Ce champ doit comporter au moins 5 caractères !"
    }
  };

  const { register, handleSubmit, formState, setValue } = useForm();

  setValue("token", tokenUser);

  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    await updatePassword(data);
    navigate("/login", {
      replace: true
    });
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center col-md-7 col-lg-5 col-sm-8"
        style={{ minHeight: "100vh" }}
      >
        <Card>
          <Card.Body>
            <Card.Title className="text-center mt-3">
              <img
                className="mb-4"
                src={SpringLogo}
                alt="Spring Logo"
                width="100"
                height="100"
              />
              <h3>Modification de mot de passe</h3>
            </Card.Title>
            <Card.Text className="text-center my-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
              natus quia veniam.
            </Card.Text>
            <form onSubmit={handleSubmit(onSubmit)} className={"px-4 mb-3"}>
              <div className={"mb-3"}>
                <label className={"form-label"} htmlFor={"password_input"}>
                  Tapez votre nouveau mot de passe
                  <span className={"text-danger fw-bold fs-5"}> *</span>
                </label>
                <input
                  {...register("password", options)}
                  className={
                    "form-control " +
                    (errors.password !== undefined ? "is-invalid" : "")
                  }
                  id={"password_input"}
                  type={"password"}
                />
                {errors.password && (
                  <span className="invalid-feedback">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className={"mb-3"}>
                <label className={"form-label"} htmlFor={"confirmation_input"}>
                  Veuillez retaper le nouveau mot de passe
                  <span className={"text-danger fw-bold fs-5"}> *</span>
                </label>
                <input
                  {...register("confirmation", options)}
                  className={
                    "form-control " +
                    (errors.confirmation !== undefined ? "is-invalid" : "")
                  }
                  id={"confirmation_input"}
                  type={"password"}
                />
                {errors.confirmation && (
                  <span className="invalid-feedback">
                    {errors.confirmation.message}
                  </span>
                )}
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "Réinitialiser mot de passe"
                ) : (
                  <div className={"d-flex align-items-center"}>
                    <span className={"fw-bold"}>Envoi en cours</span>
                    <Spinner className={"ms-auto"} />
                  </div>
                )}
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UpdatePassword;
