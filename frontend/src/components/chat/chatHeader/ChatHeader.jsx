import profile from "../../../assets/profile/profile.jpg";
import AvatarUser from "../../avatar/AvatarUser.jsx";

function ChatHeader() {
  return (
    <>
      <div className="chat-header border-bottom py-4">
        <div className="row align-items-center">
          <div className="col-2 d-xl-none">
            <a className="icon icon-lg text-muted" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </a>
          </div>
          <div className="col-8 col-xl-12">
            <div className="row align-items-center text-center text-xl-start">
              <div className="col-12 col-xl-6">
                <div className="row align-items-center gx-5">
                  <div className="col-auto">
                    <AvatarUser
                      src={profile}
                      className={"d-none d-xl-inline-block"}
                      rounded
                    />
                  </div>

                  <div className="col overflow-hidden">
                    <h5 className="text-truncate">Ollie Chandler</h5>
                    <p className="text-truncate">
                      is typing
                      <span className="typing-dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 d-none d-xl-block">
                <div className="row align-items-center justify-content-end gx-6">
                  <div className="col-auto">
                    <div className="avatar-group">
                      <AvatarUser
                        src={profile}
                        className={"avatar-sm"}
                        rounded
                      />
                      <AvatarUser
                        src={profile}
                        className={"avatar-sm"}
                        rounded
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
