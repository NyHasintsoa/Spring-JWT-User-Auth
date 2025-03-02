import { Client } from "@stomp/stompjs";
import { useState } from "react";
import { Card, CardBody, CardHeader, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/buttons/SubmitButton.jsx";
import LinkWebsocket from "./LinkWebsocket.jsx";

const listId = [
  "8520194f85a8c052",
  "e4c196f03b6b08c1",
  "f2efd38e84a3d1a8",
  "ea66780d3b42d543",
  "a8032f6c531730e5",
  "af8b2a6e4937d62d",
]

function PrivateSocket() {
  const [destinationId, setDestinationId] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const { register, handleSubmit, formState, setValue } = useForm();
  const { isSubmitting } = formState;

  const onMessageReceived = (payload) => {
    const { body } = JSON.parse(payload.body);
    setMessages((prev) => [...prev, body.data.content]);
  };

  const connect = () => {
    const client = new Client({
      brokerURL: "ws://127.0.0.1:8080/chat-socket",
      onConnect: () => {
        client.subscribe(`/chat-room/${currentUser}`, onMessageReceived);
      },
      onWebSocketError: (error) => {
        console.error("Error with websocket", error);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onDisconnect: () => {
        console.log("Disconnected");
      }
    });
    client.activate();
    setStompClient(client);
  };

  const onSubmit = async (data) => {
    if (stompClient) {
      stompClient.publish({
        destination: `/app/send/${destinationId}`,
        body: JSON.stringify({ content: data.content })
      });
      setValue("content", "");
    }
  };

  const logout = () => {
    if (stompClient) {
      stompClient.deactivate();
      setStompClient(null);
    }
  }

  const chooseDestination = (id) => {
    setDestinationId(id)
  }

  const chooseCurrentUser = (id) => {
    setCurrentUser(id)
  }

  return (
    <>
      <LinkWebsocket />
      <div className="row w-100">
        <div className="col-md-4 d-flex">
          <div className="col-6">
            <h4 className="text-center">User</h4>
            <ListGroup>
              {
                listId.map((id, index) => (
                  <ListGroupItem
                    onClick={() => chooseCurrentUser(id)}
                    active={currentUser == id}
                    key={index}
                    as={"button"}
                  >{id}</ListGroupItem>
                ))
              }
            </ListGroup>
          </div>
          <div className="col-6">
            <h4 className="text-center">Destination</h4>
            <ListGroup>
              {
                listId.map((id, index) => (
                  <ListGroupItem
                    onClick={() => chooseDestination(id)}
                    active={destinationId == id}
                    key={index}
                    as={"button"}
                  >{id}</ListGroupItem>
                ))
              }
            </ListGroup>
          </div>
        </div>
        <Container fluid className="col-md-5">
          <Card>
            <CardHeader>
              <h1 className="text-center">Private Socket</h1>
              <div className="text-center">
                {stompClient ? (
                  <button onClick={logout} type="button" className="btn btn-danger">
                    Disconnect to a publicChat
                  </button>
                ) : (
                  <button onClick={connect} type="button" className="btn btn-success">
                    Connect to a publicChat
                  </button>
                )}
              </div>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="input-text" className="form-label">Message</label>
                  <input
                    {...register("content")}
                    type="text"
                    id="input-text"
                    className="form-control"
                  />
                </div>
                <SubmitButton
                  className={"btn btn-primary w-100"}
                  isSubmitting={isSubmitting}
                  defaultText={"Send Test Message"}
                  submitText={"Sending Test Message"}
                />
              </form>
            </CardBody>
          </Card>
        </Container>
        <Container fluid className="col-md-3">
          <Card>
            <CardHeader>
              <h5 className="text-center">Messages</h5>
            </CardHeader>
            <CardBody>
              <ListGroup>
                {messages.map((message, index) => (
                  <ListGroupItem key={index}>{message}</ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default PrivateSocket;