function ChatFooter() {
  return (
    <>
      <div className="pb-3 position-absolute bottom-0 start-0">
        <form className="rounded-pill bg-secondary">
          <div className="row align-items-center gx-0">
            <div className="col-auto">
              <a
                href="#"
                className="btn btn-icon btn-link text-body rounded-circle dz-clickable"
                id="dz-btn"
              >
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
                  className="feather feather-paperclip"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </a>
            </div>

            <div className="col">
              <div className="input-group">
                <textarea
                  className="form-control px-3"
                  placeholder="Type your message..."
                  rows={1}
                  style={{
                    overflow: "hidden",
                    overflowWrap: "break-word",
                    resize: "vertical",
                    width: "531px",
                    height: "45px"
                  }}
                ></textarea>
              </div>
            </div>

            <div className="col-auto">
              <button className="btn btn-primary rounded-circle">
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
                  className="feather feather-send"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatFooter;
