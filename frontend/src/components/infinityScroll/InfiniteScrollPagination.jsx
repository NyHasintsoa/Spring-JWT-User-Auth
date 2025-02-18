import { useState, useEffect, useRef } from 'react';

// Simulated static data
const commentsData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `Comment Title ${index + 1}`,
  body: `This is the body of comment ${index + 1}.`
}));

const InfiniteScrollPagination = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10; // Number of comments per page
  const loaderRef = useRef(null);

  // Function to fetch comments
  const fetchComments = async () => {
    if (loading || !hasMore) return; // Prevent multiple loads
    setLoading(true);

    // Simulate fetching data with a timeout
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const startIndex = (page - 1) * limit;
    const newComments = commentsData.slice(startIndex, startIndex + limit);

    if (newComments.length < limit) {
      setHasMore(false); // No more data to load
    }

    setComments((prevComments) => [...prevComments, ...newComments]);
    setLoading(false);
  };

  // Load comments on initial render and when the page changes
  useEffect(() => {
    fetchComments();
  }, [page]);

  // Intersection Observer to detect when the loader is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', overflowY: 'auto' }}>
      {comments.map((comment, index) => (
        <div key={index} className="comment" style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
          <h3>{comment.title}</h3>
          <p>{comment.body}</p>
        </div>
      ))}
      {loading && <div>Loading...</div>}
      <div ref={loaderRef} style={{ height: '20px' }}></div> {/* Loader element */}
    </div>
  );
};

export default InfiniteScrollPagination;