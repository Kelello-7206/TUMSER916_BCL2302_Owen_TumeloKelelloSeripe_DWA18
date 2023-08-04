import React, { useEffect, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorite from './components/Favorite';
import Preview from './components/Preview';
import History from './components/History';

function App() {
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 'home');
  const [selectedPodcast, setSelectedPodcast] = useState(
    JSON.parse(localStorage.getItem('selectedPodcast')) || null
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favoriteEpisodes')) || []
  );

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // Define listeningHistory and setListeningHistory if used
  const [listeningHistory, setListeningHistory] = useState([]);

  const handleEpisodeComplete = (episode) => {
    if (!listeningHistory.some((item) => item.id === episode.id)) {
      setListeningHistory((prevHistory) => [...prevHistory, episode]);
    }
  };

  // Define setLastListened if used
  const [setLastListened, setSetLastListened] = useState({});

  const handleEpisodeProgress = (episode, currentTime) => {
    if (currentTime >= episode.duration - 10) {
      setSetLastListened({
        show: episode.show,
        episode: episode.title,
        progress: currentTime,
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('selectedPodcast', JSON.stringify(selectedPodcast));
  }, [currentPage, selectedPodcast]);

  useEffect(() => {
    localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div>
      <Navbar onNavigate={handleNavigation} />
      <br />
      <div className="content">
        {currentPage === 'home' && (
          <Home onPodcastClick={setSelectedPodcast} selectedPodcast={selectedPodcast} />
        )}
        {currentPage === 'favorite' && (
          <Favorite favorites={favorites} setFavorites={setFavorites} />
        )}
        {currentPage === 'preview' && (
          <Preview
            podcastId={selectedPodcast?.id}
            onFavoriteClick={handleFavoriteClick} // Pass the handleFavoriteClick function as a prop
            onEpisodeComplete={handleEpisodeComplete}
            onEpisodeProgress={handleEpisodeProgress}
          />
        )}
        {currentPage === 'history' && <History />}
      </div>
    </div>
  );
}

export default App;
