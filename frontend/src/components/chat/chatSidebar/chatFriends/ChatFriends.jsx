import { InputGroup } from "react-bootstrap";
import FriendCard from "./FriendCard.jsx";
import { FaUserPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import InputGroupText from "react-bootstrap/esm/InputGroupText.js";
import FriendPlaceholder from "./FriendPlaceholder.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { wait } from "../../../../utils/Utils.js";
import { getPaginatedUsers } from "../../../../service/UserService.js";

function ChatFriends() {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const loaderRef = useRef(null)

  const fetchFriends = useCallback(async (nbPage) => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      await wait()
      const {data} = await getPaginatedUsers(nbPage, 10)
      if (data.empty) {
        setHasMore(false)
        setLoading(false)
        return
      }
      setFriends(friends => [...friends, ...data.content])
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    fetchFriends(page)
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !loading && hasMore)
          setPage((prevPage) => prevPage + 1)
      }
    })

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => {
      if (loaderRef.current)
        observer.unobserve(loaderRef.current)
    }
  }, [loading, hasMore])

  return (
    <>
      <div className="d-flex flex-column h-100 bg-light">
        <div className="hide-scrollbar">
          <div className="container py-8">
            <div className="mb-8">
              <h2 className="fw-bold m-0">Friends</h2>
            </div>

            <div className="my-4">
              <form>
                <InputGroup>
                  <InputGroupText>
                    <FaSearch />
                  </InputGroupText>
                  <input
                    className="form-control"
                    placeholder="Search messages or users"
                    type="text"
                  />
                </InputGroup>
              </form>

              <div className="mt-4">
                <a
                  href="#"
                  className="btn btn-lg btn-primary w-100 d-flex align-items-center"
                >
                  Find Friends
                  <span className="icon ms-auto">
                    <FaUserPlus />
                  </span>
                </a>
              </div>
            </div>
            {friends.map((friend, index) => (
              <FriendCard key={index} friend={friend} />
            ))}
            {hasMore && <FriendPlaceholder loaderRef={loaderRef}/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatFriends;
