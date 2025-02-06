/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

function SidebarLink({ sidebarLink }) {
  return (
    <>
      <div className="sidebar-sidenav-menu-heading">{sidebarLink.title}</div>
      {sidebarLink.contents.map((content, index) => (
        <NavLink
          key={index}
          to={content.linkTo}
          className="nav-link link-body-emphasis"
        >
          <div className="sidebar-nav-link-icon">{content.icon}</div>
          {content.text}
        </NavLink>
      ))}
    </>
  );
}

export default SidebarLink;
