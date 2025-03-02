import { Button, Card, Container, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SpringLogo from "../../assets/image/spring-logo.png";
import { forgotPassword } from "../../service/ForgotPasswordService.js";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { wait } from "../../utils/Utils.js";

const ForgotPassword = () => {
  const [sendSuccess, setsendSuccess] = useState(true);
  const { register, handleSubmit, formState } = useForm();

  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const onSubmit = async (data) => {
    setsendSuccess(true);
    await wait(1000);
    await forgotPassword(data)
      .then((response) => {
        if (!response.ok) {
          toast.error("Error sending email");
          setsendSuccess(false);
        }
      })
      .catch((error) => {
        toast.error("Error" + error.message);
      });
  };

  return (
    <>
      <Toaster position={"top-right"} reverseOrder={false} gutter={10} />
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
              <h3>Réinitialisation de mot de passe</h3>
            </Card.Title>
            <Card.Text className="text-center my-4">
              Provide the email address associated with your account to recover
              your password.
            </Card.Text>
            <form onSubmit={handleSubmit(onSubmit)} className={"px-4 mb-3"}>
              <div>
                <label className={"form-label"} htmlFor={"email_input"}>
                  Entrez votre adresse Email
                  <span className={"text-danger fw-bold fs-5"}> *</span>
                </label>
                <input
                  {...register("email", {
                    required: "Ce champ ne doit pas être vide !",
                    minLength: {
                      value: 5,
                      message: "Ce champ doit comporter au moins 5 caractères !"
                    }
                  })}
                  className={
                    "form-control " +
                    (errors.email !== undefined ? "is-invalid" : "")
                  }
                  id={"email_input"}
                  placeholder={"name@example.com"}
                  type={"email"}
                />
                {errors.email && (
                  <span className="invalid-feedback">
                    {errors.email.message}
                  </span>
                )}
              </div>
              {isSubmitSuccessful && sendSuccess && (
                <div className={"mt-3"}>
                  <div className={"text-success"}>
                    Nous avons envoyé un mail de réinitialisation
                  </div>
                </div>
              )}
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

export default ForgotPassword;
