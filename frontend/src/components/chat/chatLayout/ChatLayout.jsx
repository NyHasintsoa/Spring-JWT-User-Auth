import { Outlet } from "react-router-dom";
import ChatNav from "../chatNav/ChatNav.jsx";
import "../../../assets/css/chat.css";
import ChatSidebar from "../chatSidebar/ChatSidebar.jsx";
import { Container } from "react-bootstrap";
import ChatHeader from "../chatHeader/ChatHeader.jsx";
// import ChatFooter from "../chatFooter/ChatFooter.jsx";

function ChatLayout() {
  return (
    <div
      className="d-flex flex-column flex-md-row min-vh-100"
      style={{ maxHeight: "100vh" }}
    >
      <ChatNav />
      <ChatSidebar />
      <main className="chat-message" style={{width: "66%"}}>
        <Container className="h-100">
          <div className="d-flex flex-column h-100 position-relative">
            <ChatHeader />
            <Outlet />
            {/* <ChatFooter /> */}
          </div>
        </Container>
      </main>
    </div>
  );
}

export default ChatLayout;
