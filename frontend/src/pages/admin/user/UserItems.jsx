/* eslint-disable react/prop-types */
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "react-bootstrap";
import { TbMail } from "react-icons/tb";
import { BiDotsHorizontal, BiSolidPencil, BiTrash } from "react-icons/bi";
import defaultProfile from "../../../assets/profile/default_profile.svg";
import { PROFILE_IMAGE_PATH } from "../../../config/constant.js";
import { Link } from "react-router-dom";

function UserItems({ user }) {
  return (
    <div className="col-md-6 col-lg-4 col-xxl-3">
      <div className="card border h-100">
        <Dropdown className="position-absolute top-0 end-0 m-3 no-arrow">
          <DropdownToggle className="btn btn-sm btn-light rounded-circle small">
            <BiDotsHorizontal className="fa-fw" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded">
            <DropdownItem>
              <BiSolidPencil className="fa-fw me-2" />
              Edit
            </DropdownItem>
            <DropdownItem>
              <BiTrash className="fa-fw me-2" />
              Remove
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="card-body text-center pb-2">
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
          <h5 className="mb-1">{user.username}</h5>
          <small>
            <TbMail className="me-1" />
            {user.email}
          </small>
        </div>
        <div className="card-footer d-flex gap-3 align-items-center">
          <Link
            to={"details/" + user.id}
            className="btn btn-sm btn-primary mb-0 w-100"
          >
            View detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserItems;
