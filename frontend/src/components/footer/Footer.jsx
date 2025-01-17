import {Button} from "react-bootstrap";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa6";
import "./footer.css"

const Footer = () => {
  return (
    <>
      <footer className={"py-5 px-5 text-bg-dark"} data-bs-theme={"dark"}>
        <div className={"row"}>

          <div className={"col-6 col-md-2 mb-3"}>
            <h5>Section</h5>
            <ul className={"nav flex-column"}>
              <li className={"nav-item mb-2"}>
                <a href={"#"} className={"nav-link p-0 text-body-secondary"}>Home</a>
              </li>
              <li className={"nav-item mb-2"}>
                <a href={"#"} className={"nav-link p-0 text-body-secondary"}>Home</a>
              </li>
              <li className={"nav-item mb-2"}>
                <a href={"#"} className={"nav-link p-0 text-body-secondary"}>Home</a>
              </li>
            </ul>
          </div>

          <div className={"col-6 col-md-2 mb-3"}>
            <h5>Section</h5>
            <ul className={"nav flex-column"}>
              <li className={"nav-item mb-2"}>
                <a href={"#"} className={"nav-link p-0 text-body-secondary"}>Home</a>
              </li>
              <li className={"nav-item mb-2"}>
                <a href={"#"} className={"nav-link p-0 text-body-secondary"}>Home</a>
              </li>
              <li className={"nav-item mb-2"}>
                <a href={"#"} className={"nav-link p-0 text-body-secondary"}>Home</a>
              </li>
            </ul>
          </div>

          <div className={"col-6 col-md-2 mb-3"}>
            <h5>Section</h5>
            <ul className={"nav flex-column"}>
              <li className={"nav-item mb-2"}>
                <a href={"#"} className={"nav-link p-0 text-body-secondary"}>Home</a>
              </li>
              <li className={"nav-item mb-2"}>
                <a href={"#"} className={"nav-link p-0 text-body-secondary"}>Home</a>
              </li>
              <li className={"nav-item mb-2"}>
                <a href={"#"} className={"nav-link p-0 text-body-secondary"}>Home</a>
              </li>
            </ul>
          </div>

          <div className={"col-md-5 offset-md-1 mb-3"}>
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of what new and exciting from us.</p>
              <div className={"d-flex flex-column flex-sm-row w-100 gap-2"}>
                <input id={"newsletter1"} type={"email"} className={"form-control"} placeholder={"Email address"}/>
                <Button variant={"primary"} type={"button"}>Subscribe</Button>
              </div>
            </form>
          </div>

        </div>

        <div className={"d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top"}>
          <p>© 2023 Company, Inc. All rights reserved.</p>
          <ul className={"list-unstyled d-flex"}>
            <li className={"ms-3"}>
              <a className={"link-body-emphasis"} href={"#"}>
                <FaTwitter size={24}/>
              </a>
            </li>
            <li className={"ms-3"}>
              <a className={"link-body-emphasis"} href={"#"}>
                <FaInstagram size={24}/>
              </a>
            </li>
            <li className={"ms-3"}>
              <a className={"link-body-emphasis"} href={"#"}>
                <FaFacebook size={24}/>
              </a>
            </li>
          </ul>
        </div>

      </footer>
    </>
  )
}

export default Footer