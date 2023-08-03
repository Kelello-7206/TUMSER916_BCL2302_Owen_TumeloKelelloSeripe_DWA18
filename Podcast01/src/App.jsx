import React, { useEffect, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorite from './components/Favorite';
import Preview from './components/Preview';

function App() {
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 'home');
  const [selectedPodcast, setSelectedPodcast] = useState(
    JSON.parse(localStorage.getItem('selectedPodcast')) || null
  );

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('selectedPodcast', JSON.stringify(selectedPodcast));
  }, [currentPage, selectedPodcast]);

  return (
    <>
      <Navbar onNavigate={handleNavigation} />
      <br />
      <br />
      {currentPage === 'home' && (
        <Home onPodcastClick={setSelectedPodcast} selectedPodcast={selectedPodcast} />
      )}
      {currentPage === 'favorite' && <Favorite />}
      {currentPage === 'preview' && <Preview podcastId={selectedPodcast?.id} />}
    </>
  );
}

export default App;
