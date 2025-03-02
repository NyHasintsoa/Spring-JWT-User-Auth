/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "react-bootstrap";
import defaultProfile from "../../../../assets/profile/default_profile.svg";
import AvatarUser from "../../../avatar/AvatarUser.jsx";
import { PROFILE_IMAGE_PATH } from "../../../../config/constant.js";
import { Link } from "react-router-dom"

function FriendCard({ friend }) {
  return (
    <>
      <Card className="border-0 friend-card my-3">
        <CardBody>
          <div className="row align-items-center">
            <div className="col-auto">
              <AvatarUser
                src={
                  friend.profileImage == null
                  ? defaultProfile
                  : PROFILE_IMAGE_PATH + friend.profileImage
                }
                rounded
              />
            </div>

            <div className="col">
              <Link to={"/chat/"+friend.id} className="fs-5 text-decoration-none text-dark">
                {friend.username}
              </Link>
              <p>{friend.email}</p>
            </div>

            <div className="col-auto">
              <Dropdown className="no-arrow">
                <DropdownToggle
                  as={"a"}
                  type="button"
                  className="icon text-muted"
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
                    className="feather feather-more-vertical"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </DropdownToggle>
                <DropdownMenu as={"ul"}>
                  <DropdownItem as={"li"}>New message</DropdownItem>
                  <DropdownItem as={"li"}>Edit contact</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem as={"li"}>New message</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default FriendCard;
