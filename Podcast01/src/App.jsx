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
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favoriteEpisodes')) || []
  ); // Declare the favorites state

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleFavoriteClick = (podcast) => {
    // Check if the podcast is already in the favorites list
    if (!favorites.some((fav) => fav.id === podcast.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, podcast]);
    }
  };

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('selectedPodcast', JSON.stringify(selectedPodcast));
    localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites)); // Save favorites to local storage
  }, [currentPage, selectedPodcast, favorites]);

  return (
    <>
      <Navbar onNavigate={handleNavigation} />
      <br />
      <br />
      {currentPage === 'home' && (
        <Home onPodcastClick={setSelectedPodcast} selectedPodcast={selectedPodcast} />
      )}
      {currentPage === 'favorite' && <Favorite favorites={favorites} setFavorites={setFavorites} />}
      {currentPage === 'preview' && (
        <Preview podcastId={selectedPodcast?.id} onFavoriteClick={handleFavoriteClick} />
      )}
    </>
  );
}

export default App;
