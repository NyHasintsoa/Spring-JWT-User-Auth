import { PiUsersThreeDuotone } from "react-icons/pi";
import { FaPeopleGroup, FaMoneyBillTrendUp } from "react-icons/fa6";
import CounterItem from "./CounterItem.jsx";
import defaultProfile from "../../../assets/profile/default_profile.svg";
import { BsFillGeoAltFill, BsSkype, BsTelephoneFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getUserById } from "../../../service/UserService.js";
import { wait } from "../../../utils/Utils.js";
import { Badge, Spinner } from "react-bootstrap";
import { PROFILE_IMAGE_PATH } from "../../../config/constant.js";
import DetailUserItem from "./DetailUserItem.jsx";

const items = [
  {
    number: 40,
    icon: <PiUsersThreeDuotone className="fa-fw" />,
    label: "Booking this month"
  },
  {
    number: 40,
    icon: <FaPeopleGroup className="fa-fw" />,
    label: "Booking this month"
  },
  {
    number: 40,
    icon: <FaMoneyBillTrendUp className="fa-fw" />,
    label: "Booking this month"
  }
];

function UserDetail() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const getUser = useCallback(async (userId) => {
    await wait(1000);
    const response = await getUserById(userId);
    setUser(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getUser(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="row g-4 mb-4">
        {items.map((item, index) => (
          <CounterItem key={index} item={item} />
        ))}
      </div>

      <h1>{userId}</h1>

      {!loading ? (
        <>
          <div className="row g-4 mb-5">
            <div className="col-md-4 col-xxl-3">
              <div className="card bg-light border-0">
                <div className="card-body text-center">
                  <div className="avatar avatar-xl flex-shrink-0 mb-3">
                    <img
                      className="avatar-img rounded-circle"
                      src={
                        user.profileImage == null
                          ? defaultProfile
                          : PROFILE_IMAGE_PATH + user.profileImage
                      }
                      alt="avatar"
                    />
                  </div>
                  <h5 className="mb-2">{user.username}</h5>
                </div>
                <div className="card-footer bg-light py-4">
                  <h6 className="mb-3">Contact Details</h6>

                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-md text-bg-secondary h6 mb-0 rounded-circle d-flex justify-content-center align-items-center">
                      <BsTelephoneFill />
                    </div>
                    <div className="ms-2">
                      <small className="text-secondary">Phone</small>
                      <h6 className="small mb-0">
                        <a
                          href="#"
                          className="text-decoration-none text-dark fw-bold"
                        >
                          +1(404) 586-854
                        </a>
                      </h6>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-md text-bg-secondary h6 mb-0 rounded-circle d-flex justify-content-center align-items-center">
                      <BsFillGeoAltFill />
                    </div>
                    <div className="ms-2">
                      <small className="text-secondary">Address</small>
                      <h6 className="text-dark fw-bold small mb-0">
                        225 Cherry Street #56, New York
                      </h6>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="icon-md text-bg-secondary h6 mb-0 rounded-circle d-flex justify-content-center align-items-center">
                      <BsSkype />
                    </div>
                    <div className="ms-2">
                      <small className="text-secondary">Skype</small>
                      <h6 className="text-dark fw-bold small mb-0">
                        @Jacqueline56
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8 col-xxl-9">
              <div className="card shadow">
                <div className="card-header border-bottom">
                  <h5 className="mb-0">Personal Information</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <ul className="list-group list-group-borderless">
                        <DetailUserItem
                          title={"Full Name"}
                          value={user.fullname}
                        />
                        <DetailUserItem
                          title={"Username"}
                          value={user.username}
                        />
                        <DetailUserItem
                          title={"Mobile Number"}
                          value={"+1(404) 586-854"}
                        />
                        <DetailUserItem
                          title={"Agent License"}
                          value={"258ED458962"}
                        />
                      </ul>
                    </div>

                    <div className="col-12 col-lg-6">
                      <ul className="list-group list-group-borderless">
                        <DetailUserItem title={"Email ID"} value={user.email} />
                        <DetailUserItem title={"Gender"} value={"Female"} />
                        <DetailUserItem title={"Gender"} value={"Female"} />
                        <DetailUserItem
                          title={"Joining Date"}
                          value={new Date(user.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric"
                            }
                          )}
                        />
                      </ul>
                    </div>

                    <div className="col-12 col-sm-5 my-3 px-5">
                      <h5>{"User's Roles"}</h5>
                      {Array.from(user.roles).map((role, index) => (
                        <Badge className="mx-1" key={index}>
                          {role}
                        </Badge>
                      ))}
                    </div>

                    <div className="col-12">
                      <ul className="list-group list-group-borderless">
                        <li className="list-group-item">
                          <span>Description: </span>
                          <p className="h6 fw-normal mb-0">
                            As it so contrasted oh estimating instrument.
                            Size-like body someone had. Are conduct viewing boy
                            minutes warrant the expense Tolerably behavior may
                            admit daughters offending her ask own? Praise effect
                            wishes to change way and any wanted. Lively use
                            looked latter regard had. Does he it part last in
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner
            variant="primary"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      )}
    </>
  );
}

export default UserDetail;
