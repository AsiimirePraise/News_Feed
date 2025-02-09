import { useState } from 'react'
import NewsFeed from './Components/NewsFeed';
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My News Feed</h1>
      </header>
      <main>
        <NewsFeed />
      </main>
    </div>
  );
}

export default App
