import profile from "../../../assets/profile/profile.jpg";
import AvatarUser from "../../../components/avatar/AvatarUser.jsx";
import chatImg1 from "../../../assets/chat/1.jpg";
import chatImg2 from "../../../assets/chat/2.jpg";
import chatImg3 from "../../../assets/chat/3.jpg";

function ChatData() {
  return (
    <>
      <div
        className="hide-scrollbar flex-1 h-100 pt-3"
        style={{ paddingBottom: "100px" }}
      >
        <div className="message">
          <AvatarUser src={profile} rounded />
          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">
                    Hey, Marshall! How are you? Can you please change the color
                    theme of the website to pink and purple?
                  </p>
                </div>
              </div>
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">Send me the files please.</p>
                </div>
              </div>
            </div>
            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message message-out">
          <AvatarUser src={profile} rounded />

          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <blockquote className="blockquote overflow-hidden">
                    <h6 className="text-reset text-truncate">William Wright</h6>
                    <p className="mb-0 small text-truncate">
                      Hey, Marshall! How are you? Can you please change the
                      color theme of the website to pink and purple?
                    </p>
                  </blockquote>
                  <p className="mb-0">
                    Hey, Marshall! How are you? Can you please change the color
                    theme of the website to pink and purple?
                  </p>
                </div>
              </div>

              <div className="message-content">
                <div className="message-text">
                  <div className="row align-items-center gx-4">
                    <div className="col-auto">
                      <a href="#" className="btn btn-light">
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
                          className="feather feather-arrow-down"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                      </a>
                    </div>
                    <div className="col overflow-hidden">
                      <h6 className="text-truncate text-reset">
                        <a href="#" className="text-reset ">
                          filename.json
                        </a>
                      </h6>
                      <ul className="list-inline text-uppercase extra-small opacity-75 mb-0">
                        <li className="list-inline-item">79.2 KB</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message-divider">
          <small className="text-muted">Monday, Sep 16</small>
        </div>

        <div className="message">
          <AvatarUser src={profile} rounded />
          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">
                    Hey, Marshall! How are you? Can you please change the color
                    theme of the website to pink and purple?
                  </p>
                </div>
              </div>
            </div>

            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message message-out">
          <AvatarUser src={profile} rounded />

          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-gallery">
                  <div className="row gx-3">
                    <div className="col">
                      <img
                        className="img-fluid rounded"
                        src={chatImg1}
                        alt="profile"
                      />
                    </div>
                    <div className="col">
                      <img
                        className="img-fluid rounded"
                        src={chatImg2}
                        alt="profile"
                      />
                    </div>
                    <div className="col">
                      <img
                        className="img-fluid rounded"
                        src={chatImg3}
                        alt="profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#modal-user-profile"
            className="avatar avatar-responsive"
          >
            <img className="avatar-img" src={profile} alt="" />
          </a>

          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">
                    Hey, Marshall! How are you? Can you please change the color
                    theme of the website to pink and purple?
                  </p>
                </div>
              </div>
            </div>

            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message-divider">
          <small className="text-muted">Friday, Sep 20</small>
        </div>

        <div className="message message-out">
          <AvatarUser src={profile} rounded />

          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">
                    Hey, Marshall! How are you? Can you please change the color
                    theme of the website to pink and purple?
                  </p>
                </div>
              </div>
            </div>

            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#modal-user-profile"
            className="avatar avatar-responsive"
          >
            <img className="avatar-img" src={profile} alt="" />
          </a>

          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">
                    Hey, Marshall! How are you? Can you please change the color
                    theme of the website to pink and purple?
                  </p>
                </div>
              </div>
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">Send me the files please</p>
                </div>
              </div>
            </div>

            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message message-out">
          <AvatarUser src={profile} rounded />

          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">
                    Hey, Marshall! How are you? Can you please change the color
                    theme of the website to pink and purple?
                  </p>
                </div>
              </div>
            </div>

            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#modal-user-profile"
            className="avatar avatar-responsive"
          >
            <img className="avatar-img" src={profile} alt="" />
          </a>

          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">
                    Hey, Marshall! How are you? Can you please change the color
                    theme of the website to pink and purple?
                  </p>
                </div>
              </div>
            </div>

            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message message-out">
          <AvatarUser src={profile} rounded />

          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">
                    Hey, Marshall! How are you? Can you please change the color
                    theme of the website to pink and purple? 😂
                  </p>
                </div>
              </div>
            </div>

            <div className="message-footer">
              <span className="extra-small text-muted">08:45 PM</span>
            </div>
          </div>
        </div>

        <div className="message">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#modal-user-profile"
            className="avatar avatar-responsive"
          >
            <img className="avatar-img" src={profile} alt="" />
          </a>

          <div className="message-inner">
            <div className="message-body">
              <div className="message-content">
                <div className="message-text">
                  <p className="mb-0">
                    Chandler is typing
                    <span className="typing-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatData