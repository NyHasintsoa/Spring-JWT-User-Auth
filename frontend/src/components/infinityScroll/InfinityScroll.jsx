import { useState, useEffect, useRef } from 'react';

// Simulated static data
const commentsData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Comment Title ${index + 1}`,
    body: `This is the body of comment ${index + 1}.`
}));

const InfiniteScroll = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const loaderRef = useRef(null);

    // Function to fetch comments
    const fetchComments = () => {
        setLoading(true);
        // Simulate fetching data with a timeout
        setTimeout(() => {
            setComments((prevComments) => [...prevComments, ...commentsData]);
            setLoading(false);
        }, 1000); // Simulate network delay
    };

    // Load comments when the component mounts and when the page changes
    useEffect(() => {
        fetchComments();
    }, [page]);

    // Intersection Observer to detect when the loader is in view
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                setPage((prevPage) => prevPage + 1);
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
    }, [loading]);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', overflowY: 'auto' }}>
            {comments.map((comment) => (
                <div key={comment.id} className="comment" style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                    <h3>{comment.title}</h3>
                    <p>{comment.body}</p>
                </div>
            ))}
            {loading && <div>Loading...</div>}
            <div ref={loaderRef} style={{ height: '20px' }}></div> {/* Loader element */}
        </div>
    );
};

export default InfiniteScroll;