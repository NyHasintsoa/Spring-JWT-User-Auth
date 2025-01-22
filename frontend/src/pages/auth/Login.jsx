import { Card, CardBody, Container } from "react-bootstrap";
import SpringLogo from "../../assets/image/spring-logo.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    try{
      console.log(data);
    } catch(error) {
      console.log(error)
    }
  }

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
              <h1 className="h3 mb-3 fw-normal text-center">Connexion</h1>

              <div className="form-floating mb-3">
                <input
                  defaultValue={"admin@domain.com"}
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

              <div className={"my-3 text-start"}>
                <Link
                  to={"/forgot-password"}
                  style={{ textDecoration: "none" }}
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "Se Connecter"
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
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
