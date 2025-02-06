/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { wait } from "../../../utils/Utils.js";
import { getAllUsers } from "../../../service/UserService.js";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import UserItem from "./UserItems.jsx";
import { Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Items = ({ users }) => {
  return (
    <>
      {users.map((user, index) => (
        <UserItem key={index} user={user} />
      ))}
    </>
  );
};

function ListUser() {
  const [itemOffset, setItemOffset] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  const getEmploye = useCallback(async () => {
    await wait(1000);
    const response = await getAllUsers();
    setUsers(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getEmploye();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="row">
        <div className="col-12 mb-4 mb-sm-5">
          <div className="d-sm-flex justify-content-between align-items-center">
            <h1 className="mb-3 mb-sm-0">Agent List</h1>
            <div className="btn-group">
              <Link
                to={"/admin/users/add"}
                type="button"
                className="btn btn-primary"
              >
                Add User <FaUserPlus className="ms-2" size={"1.25rem"} />
              </Link>
              <button type="button" className="btn btn-success">
                Middle
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 align-items-center justify-content-between mb-5">
        <div className="col-md-8">
          <form className="rounded position-relative">
            <input
              className="form-control pe-5"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn border-0 px-3 py-0 position-absolute top-50 end-0 translate-middle-y"
              type="submit"
            >
              <FaSearch className="fs-6" />
            </button>
          </form>
        </div>

        <div className="col-md-3">
          <select className="form-select">
            <option value="">Sort by</option>
          </select>
        </div>
      </div>
      {/* ------------------------------------------
      Liste des utilisateurs
      ------------------------------------------ */}
      <div className="row g-4">
        {!loading ? (
          <>
            <Items users={users.slice(itemOffset, itemOffset + itemsPerPage)} />
            <div className="w-100 d-flex justify-content-center">
              <ReactPaginate
                breakLabel=". . ."
                nextLabel="Next"
                previousLabel="Previous"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(users.length / itemsPerPage)}
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
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
      </div>
    </>
  );
}

export default ListUser;
