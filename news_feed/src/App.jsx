import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsFeed from './Components/NewsFeed';
import PostPage from './Components/PostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;