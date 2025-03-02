import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getConversationsFor, writeMessage } from "../../../service/MessageService.js";
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

  const onSubmit = (messageWritted) => {
    if (stompClient && userId) {
      stompClient.publish({
        destination: `/app/send/${userId}`,
        body: JSON.stringify(messageWritted)
      })
      // const { data } = await writeMessage(messageWritted, userId)
      // setMessages(listMessages => [...listMessages, data])
      setValue("content", "")
    }
  }

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log(
      "###################################################\n",
      "onMessageReceived => payloadData",
      payloadData,
      "\n###################################################\n"
    )
  }

  const { errors, isSubmitting } = formState

  const getMessages = useCallback(async (idUser) => {
    if (userId != undefined) {
      const { data } = await getConversationsFor(idUser)
      setMessages(data)
    }
  }, [userId])

  const connectToChat = useCallback((idUser) => {
    const client = new Client({
      brokerURL: "ws://127.0.0.1:8080/chat-socket",
      onConnect: () => {
        console.log(`/user/${idUser}/queue/messages`)
        client.subscribe(`/user/${idUser}/queue/messages`, onMessageReceived);
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
      connectToChat(userId)
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
