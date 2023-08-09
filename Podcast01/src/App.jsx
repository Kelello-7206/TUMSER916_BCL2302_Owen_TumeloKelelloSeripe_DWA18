import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import Preview from "./components/Preview";
import History from "./components/History";
import { createClient } from "@supabase/supabase-js";

function App() {
  const supabaseUrl = "https://fwsulwcbmsvkhpbhdokp.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3c3Vsd2NibXN2a2hwYmhkb2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTExNTk3NTcsImV4cCI6MjAwNjczNTc1N30.pGzsnq9JfKW7yEgXbLxrF7etAIiK8qrleNSCRg4xcxM";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || "home"
  );
  const [selectedPodcast, setSelectedPodcast] = useState(
    JSON.parse(localStorage.getItem("selectedPodcast")) || null
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteEpisodes")) || []
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

  // Define handleFavoriteClick function to handle favoriting episodes
  const handleFavoriteClick = (episode) => {
    if (!favorites.some((fav) => fav.id === episode.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, episode]);
    }
  };

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("selectedPodcast", JSON.stringify(selectedPodcast));
  }, [currentPage, selectedPodcast]);

  useEffect(() => {
    localStorage.setItem("favoriteEpisodes", JSON.stringify(favorites));
  }, [favorites]);

  // Define removeFromFavorites function in the App component
  const removeFromFavorites = (episode) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favEpisode) => favEpisode !== episode)
    );
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigation} />
      <br />
      <div className="content">
        {currentPage === "home" && (
          <Home
            onPodcastClick={setSelectedPodcast}
            selectedPodcast={selectedPodcast}
          />
        )}
        {currentPage === "favorite" && (
          <Favorite
            favorites={favorites}
            setFavorites={setFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        )}
        {currentPage === "preview" && (
          <Preview
            podcastId={selectedPodcast?.id}
            onFavoriteClick={handleFavoriteClick}
            onEpisodeComplete={handleEpisodeComplete}
            onEpisodeProgress={handleEpisodeProgress}
          />
        )}
        {currentPage === "history" && <History />}
      </div>
    </div>
  );
}

export default App;
