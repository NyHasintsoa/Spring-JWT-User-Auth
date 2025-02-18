import { Card, CardBody } from "react-bootstrap"

function FriendPlaceholder({className = "js-infinite-pagination", loaderRef}) {
  return (
    <Card ref={loaderRef} className={"border-0 friend-card my-3 "+ className}>
      <CardBody>
        <div className="row align-items-center placeholder-glow">
          <div className="col-auto">
            <div className="placeholder avatar rounded-circle"></div>
          </div>

          <div className="col flex-column align-items-center">
              <span className="placeholder rounded col-10"></span>
              <span className="placeholder rounded col-10"></span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default FriendPlaceholder