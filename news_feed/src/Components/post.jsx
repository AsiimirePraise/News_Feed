import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({ post }) {
  return (
    <article className="post-card">
      <div className="post-header">
        <span className="post-category">
          {post.Category || "Uncategorized"}
        </span>
        <time className="post-date">
          {new Date(post.publishedAt).toLocaleDateString()}
        </time>
      </div>

      <h2 className="post-title">{post.Title || "Untitled Post"}</h2>

      <p className="post-author">By {post.Author || "Anonymous"}</p>

      <div className="post-content">
        <p>{post.Excerpt || post.Content?.substring(0, 200) + "..."}</p>
      </div>

      <Link to={`/post`} state={{ post }} className="read-more">
        Read More
      </Link>
    </article>
  );
}
