import {Button, Card, CardImg} from "react-bootstrap";
import cardImg from "../../assets/image/card-img.png"

// eslint-disable-next-line react/prop-types
const CardHome = ({title}) => {
  return (
    <>
      <Card style={{width: "18rem"}}>
        <CardImg variant={"top"} src={cardImg} alt={"card image"}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, reiciendis!</Card.Text>
          <Button variant={"primary"} type={"button"}>Show more</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardHome