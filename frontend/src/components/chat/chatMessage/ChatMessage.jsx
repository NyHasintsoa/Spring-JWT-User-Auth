/* eslint-disable react/prop-types */
import AvatarUser from "../../avatar/AvatarUser.jsx"
import profile from "../../../assets/profile/default_profile.svg";
import { useCallback } from "react";
import moment from "moment";
//import { PROFILE_IMAGE_PATH } from "../../../config/constant.js";

function ChatMessage({ message, accountId }) {
  const isMe = () => accountId != message.fromId.id

  const ago = useCallback(() => {
    return moment(message.createdAt).fromNow()
  }, [message.createdAt])

  return (
    <div className={"message " + (isMe() ? "" : "message-out")}>
      <AvatarUser src={
        profile
      } rounded />
      <div className="message-inner">
        <div className="message-body">
          <div className="message-content">
            <div className="message-text">
              <p className="mb-0">
                { message.content }
              </p>
            </div>
          </div>
        </div>
        <div className="message-footer">
          <span className="extra-small text-muted">
            { ago() }
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage