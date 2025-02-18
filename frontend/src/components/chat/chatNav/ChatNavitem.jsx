import { NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function ChatNavitem({ to, className = "", children }) {
  return (
    <>
      <NavItem as={"li"} className={className}>
        <NavLink to={to} className="nav-link py-0 py-lg-4">
          <div className="icon icon-xl">{children}</div>
        </NavLink>
      </NavItem>
    </>
  );
}

export default ChatNavitem;
