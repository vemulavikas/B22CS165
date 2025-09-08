import React, { useState } from 'react';
import './App.css';
import UrlShortener from './UrlShortener';
import StatisticsPage from './StatisticsPage';

function App() {
  const [page, setPage] = useState('shortener');
  const [shortenedUrls, setShortenedUrls] = useState([]);

  return (
    <div className="App">
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setPage('shortener')}>URL Shortener</button>
        <button onClick={() => setPage('stats')}>Statistics</button>
      </nav>
      {page === 'shortener' ? (
        <UrlShortener onShorten={setShortenedUrls} />
      ) : (
        <StatisticsPage urls={shortenedUrls} />
      )}
    </div>
  );
}

export default App;

