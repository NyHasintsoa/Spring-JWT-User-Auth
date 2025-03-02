import { ButtonGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

function LinkWebsocket() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <ButtonGroup className="my-5">
          <Link to={"/private-socket"} className="btn btn-success">
            Private Socket
          </Link>
          <Link to={"/public-socket"} className="btn btn-primary">
            Public Socket
          </Link>
        </ButtonGroup>
      </div>
    </>
  )
}

export default LinkWebsocket