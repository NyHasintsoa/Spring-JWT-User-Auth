import {useForm} from "react-hook-form";
import {Button, ButtonGroup, Card, CardBody, Container} from "react-bootstrap";
import SpringLogo from "../../assets/image/spring-logo.png";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {FaCheck, FaTimes} from "react-icons/fa";

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

const fetchData = async (uri) => {
  return await fetch(uri)
    .then(async response => {
      console.log(response)
      if (!response.ok){
        const errorResponse = await response.json()
        throw {
          data: errorResponse.data,
          message: errorResponse.message
        }
      }
      return response.json()
    })
}

const Test = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState
  } = useForm()
  
  const {
    errors,
    isSubmitting
  } = formState

  const onSubmit = async (data) => {
    await toast.promise(wait(2000), {
      loading: 'Loading',
      success: 'Got the data',
      error: 'Error when fetching',
    })
    console.log(data)
  }

  const successBtn = async () => {
    await toast.promise(fetchData("/api/test/show-test?error=errors"),{
      loading: "Veuillez patienter",
      success: (data) => {
        console.log(data)
        return `Success => ${data.message}`
      }
    })
  }

  const errorBtn = async () => {
    try {
      await toast.promise(fetchData("/api/test/show-test?error=error"),
        {
          loading: "Veuillez patienter",
          error: (data) => `Error => ${data.data}`
        })
    }catch (error) {
      console.log(error.message)
    }
  }

  const nextBtn = async () => {
    await toast.promise(
      new Promise((resolve) => {
        window.setTimeout(resolve, 1000)
      })
      .then(() => JSON.stringify({
        "message": "FORBIDDEN",
        "data": "Bad credentials"
      }))
      .then((data) => {
        console.log(data.json())
      })
      , {
      loading: "Veuillez patienter",
      success: "Success",
      error: "Error"
    })
    navigate("/test-next", {
      replace: true
    })
  }

  return (
    <>
      <div style={{minHeight: '100vh'}} className={"d-flex align-items-center"}>
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
                    className={"form-control " + (errors.email !== undefined ? "is-invalid" : "")}
                    id="floatingInput"
                    placeholder="Email"
                  />
                  <label htmlFor="floatingInput">Email</label>
                  {
                    errors.email && <span className="invalid-feedback">{errors.email.message}</span>
                  }
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
                    className={"form-control " + (errors.password !== undefined ? "is-invalid" : "")}
                    id="floatingPassword"
                    placeholder="Mot de passe"
                  />
                  <label htmlFor="floatingPassword">Mot de passe</label>
                  {
                    errors.password && (<span className="invalid-feedback">{errors.password.message}</span>)
                  }
                </div>

                <div className={"my-3 text-start"}>
                  <Link to={"/forgot-password"} style={{textDecoration: "none"}}>Mot de passe oublié ?</Link>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isSubmitting}>
                  {
                    !isSubmitting ? "Se Connecter" : (
                      <div className={"d-flex align-items-center"}>
                        <span className={"fw-bold"}>Vérification...</span>
                        <span className={"spinner-border ms-auto"} role={"status"} aria-hidden={true}></span>
                      </div>
                    )
                  }
                </button>
              </form>
              <ButtonGroup className={"w-100"}>
                <Button variant={"success"} type={"button"} className={"mt-3"} onClick={successBtn}>
                  <FaCheck className={"me-3"}/>
                  Show Success Toast
                </Button>
                <Button variant={"danger"} type={"button"} className={"mt-3"} onClick={errorBtn}>
                  <FaTimes className={"me-3"}/>
                  Show Error Toast
                </Button>
              </ButtonGroup>

              <Button variant={"warning"} type={"button"} className={"w-100 mt-3"} onClick={nextBtn}>
                Next Page
              </Button>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  )
}

export default Test