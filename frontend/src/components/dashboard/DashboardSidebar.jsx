import {
  FaAngleDown,
  FaBookOpen,
  FaChartArea,
  FaColumns,
  FaTable,
  FaTachometerAlt
} from "react-icons/fa";

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
              <div className="sidebar-sidenav-menu-heading">Core</div>
              <a className="nav-link active" href="index.html">
                <div className="sidebar-nav-link-icon">
                  <FaTachometerAlt />
                </div>
                Dashboard
              </a>
              <div className="sidebar-sidenav-menu-heading">Interface</div>
              <a
                className="nav-link link-body-emphasis collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sidebar-nav-link-icon">
                  <FaColumns />
                </div>
                Layouts
                <div className="sidebar-sidenav-collapse-arrow">
                  <FaAngleDown />
                </div>
              </a>
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sidebar-sidenav-menu-nested nav">
                  <a
                    className="nav-link link-body-emphasis"
                    href="layout-static.html"
                  >
                    Static Navigation
                  </a>
                  <a
                    className="nav-link link-body-emphasis"
                    href="layout-sidenav-light.html"
                  >
                    Light Sidenav
                  </a>
                </nav>
              </div>
              <a
                className="nav-link link-body-emphasis collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"
              >
                <div className="sidebar-nav-link-icon">
                  <FaBookOpen />
                </div>
                Pages
                <div className="sidebar-sidenav-collapse-arrow">
                  <FaAngleDown />
                </div>
              </a>
              <div
                className="collapse"
                id="collapsePages"
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
              >
                <nav
                  className="sidebar-sidenav-menu-nested nav accordion"
                  id="sidenavAccordionPages"
                >
                  <a
                    className="nav-link link-body-emphasis collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseAuth"
                    aria-expanded="false"
                    aria-controls="pagesCollapseAuth"
                  >
                    Authentication
                    <div className="sidebar-sidenav-collapse-arrow">
                      <FaAngleDown />
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="pagesCollapseAuth"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sidebar-sidenav-menu-nested nav">
                      <a
                        className="nav-link link-body-emphasis"
                        href="login.html"
                      >
                        Login
                      </a>
                      <a
                        className="nav-link link-body-emphasis"
                        href="register.html"
                      >
                        Register
                      </a>
                      <a
                        className="nav-link link-body-emphasis"
                        href="password.html"
                      >
                        Forgot Password
                      </a>
                    </nav>
                  </div>
                  <a
                    className="nav-link link-body-emphasis collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseError"
                    aria-expanded="false"
                    aria-controls="pagesCollapseError"
                  >
                    Error
                    <div className="sidebar-sidenav-collapse-arrow">
                      <FaAngleDown />
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="pagesCollapseError"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sidebar-sidenav-menu-nested nav">
                      <a
                        className="nav-link link-body-emphasis"
                        href="401.html"
                      >
                        401 Page
                      </a>
                      <a
                        className="nav-link link-body-emphasis"
                        href="404.html"
                      >
                        404 Page
                      </a>
                      <a
                        className="nav-link link-body-emphasis"
                        href="500.html"
                      >
                        500 Page
                      </a>
                    </nav>
                  </div>
                </nav>
              </div>
              <div className="sidebar-sidenav-menu-heading">Addons</div>
              <a className="nav-link link-body-emphasis" href="charts.html">
                <div className="sidebar-nav-link-icon">
                  <FaChartArea />
                </div>
                Charts
              </a>
              <a className="nav-link link-body-emphasis" href="tables.html">
                <div className="sidebar-nav-link-icon">
                  <FaTable />
                </div>
                Tables
              </a>
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
