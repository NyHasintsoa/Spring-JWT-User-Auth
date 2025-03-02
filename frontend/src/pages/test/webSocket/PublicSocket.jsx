import { Client } from "@stomp/stompjs";
import { useState } from "react";
import { Card, CardBody, CardHeader, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { wait } from "../../../utils/Utils.js";
import SubmitButton from "../../../components/buttons/SubmitButton.jsx";
import LinkWebsocket from "./LinkWebsocket.jsx";

function PublicSocket() {
  const [stompClient, setStompClient] = useState(null)
  const [messages, setMessages] = useState([])
  const { register, handleSubmit, formState, setValue } = useForm()

  const { isSubmitting } = formState

  const onMessageReceived = (payload) => {
    const { body } = JSON.parse(payload.body)
    setMessages(prevMess => [...prevMess, body.data.content])
  }

  const connect = () => {
    const client = new Client({
      brokerURL: "ws://127.0.0.1:8080/chat-socket",
      onConnect: () => {
        client.subscribe("/chat-room/public", onMessageReceived);
      },
      onWebSocketError: (error) => {
        console.error("Error with websocket", error);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onDisconnect: () => {}
    })
    client.activate()
    setStompClient(client)
    return () => {
      stompClient.deactivate()
      setStompClient(null)
    }
  }

  const onSubmit = async (data) => {
    await wait()
    if (stompClient) {
      stompClient.publish({
        destination: "/app/message",
        body: JSON.stringify(data)
      })
      setValue("content", "")
    }
  }

  const logout = () => {
    if (stompClient){
      stompClient.deactivate()
      setStompClient(null)
      setMessages([])
    }
  }

  return (
    <>
      <LinkWebsocket/>
      <div className="row w-100">
        <Container fluid className="col-md-5">
          <Card>
            <CardHeader>
              <h1 className="text-center">Public Socket</h1>
              <div className="text-center">
              {
                stompClient
                ? (<button onClick={logout} type="button" className="btn btn-danger">
                    Disconnect to a publicChat
                  </button>)
                : (<button onClick={connect} type="button" className="btn btn-success">
                    Connect to a publicChat
                  </button>)
              }
              </div>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="input-text" className="form-label">Some Text Here</label>
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
        <Container fluid className="col-md-5">
          <Card>
            <CardHeader>
              <h5 className="text-center">Messages</h5>
            </CardHeader>
            <CardBody>
              <ListGroup>
                {
                  messages.map((message, index) => (
                    <ListGroupItem key={index}>{message}</ListGroupItem>
                  ))
                }
              </ListGroup>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};
export default PublicSocket