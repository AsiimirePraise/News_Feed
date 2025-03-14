import { useLocation } from 'react-router-dom';
import './PostPage.css';

export default function PostPage() {
  const location = useLocation();
  const post = location.state?.post; 

  const handleBack = () => {
    window.history.back();
  };

  if (!post) {
    return <div className="error-message">Post not found</div>;
  }

  return (
    <div className="post-page">
      <div className="container">
        <h1 className="site-title">My News Feed</h1>
        <button onClick={handleBack} className="back-button">
          ← Back to News Feed
        </button>
        <article className="full-post">
          <div className="post-header">
            <span className="post-category">
              {post.Category || 'Uncategorized'}
            </span>
            <time className="post-date">
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
          </div>
          <h1 className="post-title">
            {post.Title || 'Untitled Post'}
          </h1>
          <p className="post-author">By {post.Author || 'Anonymous'}</p>
          <div className="post-content">
            <p id='content'>{post.Content}</p>
          </div>
        </article>
      </div>
    </div>
  );
}