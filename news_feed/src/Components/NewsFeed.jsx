"use client";

import { useState, useEffect } from "react";
import "./NewsFeed.css";

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPost, setExpandedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);
  // fetch posts
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:1337/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // handle response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw API response:", data);
      // data validity
      if (data && Array.isArray(data.data)) {
        setPosts(data.data);
        console.log("Processed posts:", data.data);
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

  useEffect(() => {
    console.log("Current posts state:", posts);
  }, [posts]);

  const filteredPosts = posts.filter((post) => {
    if (!post) return false;

    const title = post.Title?.toLowerCase() || "";
    const category = post.Category?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    console.log("Post:", post);
    console.log("Title:", title, "Category:", category, "Search:", search);
    // return the search item
    return title.includes(search) || category.includes(search);
  });

  console.log("Filtered posts:", filteredPosts);

  return (
    <div className="news-feed">
      <div className="container">
        <h1 className="feed-title">Praise Feed </h1>

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
        {/* when fetching posts */}
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
              filteredPosts.map((post) => (
                <article key={post.id} className="post-card">
                  <div className="post-header">
                    <span className="post-category">
                      {post.Category || "Uncategorized"}
                    </span>
                    <time className="post-date">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                  </div>
                  {/* display author and title */}
                  <h2 className="post-title">
                    {post.Title || "Untitled Post"}
                  </h2>

                  <p className="post-author">By {post.Author || "Anonymous"}</p>

                  <div className="post-content">
                    {expandedPost === post.id ? (
                      <p>{post.Content}</p>
                    ) : (
                      <p>
                        {post.Excerpt ||
                          post.Content?.substring(0, 200) + "..."}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setExpandedPost(expandedPost === post.id ? null : post.id)
                    }
                    className="read-more"
                  >
                    {expandedPost === post.id ? "Show Less" : "Read More"}
                  </button>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
