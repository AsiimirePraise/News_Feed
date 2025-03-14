import { useState, useEffect } from "react";
import Post from "./post";
import "./NewsFeed.css";

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);
  //fetch posts form my strapi
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://newsfeedstrapi-1.onrender.com/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors" 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        setPosts(data.data);
      } else {
        console.error("Unexpected data structure:", data);
        setError("Invalid data format received");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };
  //filter depending on what i search
  const filteredPosts = posts.filter((post) => {
    if (!post) return false;

    const title = post.Title?.toLowerCase() || "";
    const category = post.Category?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return title.includes(search) || category.includes(search);
  });

  return (
    <div className="news-feed">
      <div className="container">
        <h1 id="heading">MY NEWS FEED</h1>
        <h1 className="feed-title">
          Search by category: technology, love, lifestyle, education
          {showMoreCategories ? ", business, finance, health, travel" : ""}{" "}
          <span
            className="show-more"
            style={{ cursor: "pointer", color: "red", textDecoration: "none" }}
            onClick={() => setShowMoreCategories(!showMoreCategories)}
          >
            {showMoreCategories ? "Show less" : "many more"}
          </span>
        </h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="clear-search">
              ×
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="loading">Loading posts...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="posts-grid">
            {filteredPosts.length === 0 ? (
              <div className="no-posts">
                <p>
                  {posts.length === 0
                    ? "No posts available."
                    : "No posts found matching your search."}
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => <Post key={post.id} post={post} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}
