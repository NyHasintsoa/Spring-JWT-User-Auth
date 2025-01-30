import { useForm } from "react-hook-form";
import SpringLogo from "../../assets/image/spring-logo.png";
import { wait } from "../../utils/Utils.js";
import { Card, CardBody, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

const Register = () => {
  const { register, handleSubmit, formState } = useForm();
  const { registerUser } = useAuth();

  const onSubmit = async (data) => {
    await wait(1000);
    console.log(data);
    await registerUser(data);
  };

  const { errors, isSubmitting } = formState;

  return (
    <div style={{ minHeight: "100vh" }} className={"d-flex align-items-center"}>
      <Container fluid className="form-signin col-lg-4 col-md-6 col-sm-7">
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
              <div className="text-center">
                <img
                  className="mb-4"
                  src={SpringLogo}
                  alt="Spring Logo"
                  width="100"
                  height="100"
                />
              </div>
              <h1 className="h3 mb-3 fw-normal text-center">Inscription</h1>

              <div className="form-floating mb-3">
                <input
                  {...register("email", {
                    required: "Veuillez entrer votre adresse Email !",
                    minLength: {
                      value: 5,
                      message: "Ce champ doit comporter au moins 5 caractères"
                    }
                  })}
                  type="email"
                  className={
                    "form-control " +
                    (errors.email !== undefined ? "is-invalid" : "")
                  }
                  id="floatingInput"
                  placeholder="Email"
                />
                <label htmlFor="floatingInput">Email</label>
                {errors.email && (
                  <span className="invalid-feedback">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  {...register("username", {
                    required: "Veuillez entrer votre nom d'utilisateur !",
                    minLength: {
                      value: 5,
                      message: "Ce champ doit comporter au moins 5 caractères"
                    }
                  })}
                  type="text"
                  className={
                    "form-control " +
                    (errors.username !== undefined ? "is-invalid" : "")
                  }
                  id="floatingInputUsername"
                  placeholder="Nom d'utilisateur"
                />
                <label htmlFor="floatingInputUsername">
                  {"Nom d'utilisateur"}
                </label>
                {errors.username && (
                  <span className="invalid-feedback">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  {...register("fullname", {
                    required: "Veuillez entrer votre nom et prénom !",
                    minLength: {
                      value: 5,
                      message: "Ce champ doit comporter au moins 5 caractères"
                    }
                  })}
                  type="text"
                  className={
                    "form-control " +
                    (errors.fullname !== undefined ? "is-invalid" : "")
                  }
                  id="floatingInputFullName"
                  placeholder="Email"
                />
                <label htmlFor="floatingInputFullName">Nom et prénom</label>
                {errors.fullname && (
                  <span className="invalid-feedback">
                    {errors.fullname.message}
                  </span>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  defaultValue={"Admin@123"}
                  {...register("password", {
                    required: "Veuillez entrer votre mot de passe !",
                    minLength: {
                      value: 5,
                      message: "Ce champ doit comporter au moins 5 caractères"
                    }
                  })}
                  type="password"
                  className={
                    "form-control " +
                    (errors.password !== undefined ? "is-invalid" : "")
                  }
                  id="floatingPassword"
                  placeholder="Mot de passe"
                />
                <label htmlFor="floatingPassword">Mot de passe</label>
                {errors.password && (
                  <span className="invalid-feedback">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  defaultValue={"Admin@123"}
                  {...register("confirmation", {
                    required: "Veuillez confirmer votre mot de passe !",
                    minLength: {
                      value: 5,
                      message: "Ce champ doit comporter au moins 5 caractères"
                    }
                  })}
                  type="password"
                  className={
                    "form-control " +
                    (errors.confirmation !== undefined ? "is-invalid" : "")
                  }
                  id="floatingConfirmPassword"
                  placeholder="Confirmation mot de passe"
                />
                <label htmlFor="floatingConfirmPassword">
                  Confirmation mot de passe
                </label>
                {errors.confirmation && (
                  <span className="invalid-feedback">
                    {errors.confirmation.message}
                  </span>
                )}
              </div>

              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "S'inscrire"
                ) : (
                  <div className={"d-flex align-items-center"}>
                    <span className={"fw-bold"}>Vérification...</span>
                    <span
                      className={"spinner-border ms-auto"}
                      role={"status"}
                      aria-hidden={true}
                    ></span>
                  </div>
                )}
              </button>
            </form>
            <div className="mt-3 text-center">
              Déjà membre ?
              <Link to={"/login"} className="ms-2 text-decoration-none">
                Se connecter
              </Link>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
