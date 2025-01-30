import { FaChartArea, FaTable, FaTachometerAlt, FaUsers } from "react-icons/fa";
import SidebarLink from "./SidebarLink.jsx";

const sidebarLinks = [
  {
    title: "Administration",
    contents: [
      {
        text: "Dashboard",
        icon: <FaTachometerAlt />,
        linkTo: "/admin/dashboard"
      },
      {
        text: "Users",
        icon: <FaUsers />,
        linkTo: "/admin/users"
      }
    ]
  },
  {
    title: "Admin 1",
    contents: [
      {
        text: "Charts",
        icon: <FaChartArea />,
        linkTo: "/chart"
      },
      {
        text: "Charts",
        icon: <FaTable />,
        linkTo: "/table"
      }
    ]
  }
];

const DashboardSidebar = () => {
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sidebar-sidenav accordion text-bg-dark"
          id="sidenavAccordion"
          data-bs-theme="dark"
        >
          <div className="sidebar-sidenav-menu">
            <div className="nav nav-pills">
              {sidebarLinks.map((sidebarLink, index) => (
                <SidebarLink key={index} sidebarLink={sidebarLink} />
              ))}
            </div>
          </div>
          <div className="sidebar-sidenav-footer">
            <hr />
            <div className="small">Some text here</div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default DashboardSidebar;
