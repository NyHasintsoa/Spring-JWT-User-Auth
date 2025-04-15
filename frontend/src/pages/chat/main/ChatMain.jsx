import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getConversationsFor } from "../../../service/MessageService.js";
import ChatMessage from "../../../components/chat/chatMessage/ChatMessage.jsx";
import { useAuth } from "../../../hooks/useAuth.js";
import ChatFooter from "../../../components/chat/chatFooter/ChatFooter.jsx";
import { useForm } from "react-hook-form";
import { Client } from "@stomp/stompjs"

function ChatMain() {
  const { userId } = useParams()
  const { account } = useAuth()
  const [messages, setMessages] = useState([])
  const [stompClient, setStompClient] = useState(null)
  const { register, handleSubmit, formState, setValue } = useForm()
  const bottomMessage = useRef(null)
  setValue("fromId", account.id)

  useEffect(() => {
    connectToChat()
  }, [])

  const onSubmit = async (messageWritted) => {
    console.log(
    "\n###########################################\n",
    messageWritted,
    "\n###########################################\n"
    )
    if (stompClient && userId) {
      stompClient.publish({
        destination: `/app/message/send/${userId}`,
        body: JSON.stringify(messageWritted)
      })
      setMessages(listMessages => [...listMessages, messageWritted])
      setValue("content", "")
    }
  }

  const onMessageReceived = (payload) => {
    let { body } = JSON.parse(payload.body);
    console.log(
    "\n###########################################\n",
    body,
    "\n###########################################\n"
    )
    setMessages(listMessages => [...listMessages, body.data])
  }

  const { errors, isSubmitting } = formState

  const getMessages = useCallback(async (idUser) => {
    if (userId != undefined) {
      const { data } = await getConversationsFor(idUser)
      setMessages(data)
    }
  }, [userId])

  const connectToChat = useCallback(() => {
    const client = new Client({
      brokerURL: "ws://127.0.0.1:8080/chat-socket",
      onConnect: () => {
        client.subscribe(`/messaging/users/${account.id}`, onMessageReceived);
      },
      onWebSocketError: (error) => {
        console.error("Error with websocket", error);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onDisconnect: (frame) => {
        console.log(
          "###################################################\n",
          "onDisconnect => stompClient",
          frame,
          "\n###################################################\n",
        )
      }
    })
    client.activate()
    setStompClient(client)
    return () => {
      stompClient.deactivate()
    }
  }, [userId])

  useEffect(() => {
    if (userId !== undefined) {
      getMessages(userId)
    }
  }, [userId])

  useEffect(() => {
    if (bottomMessage.current) {
      bottomMessage.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <>
      <div
        className="overflow-scroll hide-scrollbar pt-3"
        style={{ paddingBottom: "100px" }}
      >
        {
          Array.from(messages, (item, index) => (
            <ChatMessage message={item} accountId={account.id} key={index} />
          ))
        }
      <div ref={bottomMessage}></div>
      </div>

      <ChatFooter
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

export default ChatMain;
