import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorite from './components/Favorite';
import Preview from './components/Preview';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPodcast, setSelectedPodcast] = useState(null); // Move the state to the App component

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar onNavigate={handleNavigation} />
      {currentPage === 'home' && <Home onPodcastClick={setSelectedPodcast} />} {/* Pass the setSelectedPodcast function to Home */}
      {currentPage === 'favorite' && <Favorite />}
      {currentPage === 'preview' && <Preview podcastId={selectedPodcast?.id} />} {/* Pass the selectedPodcast's id to Preview */}
    </>
  );
}

export default App;
