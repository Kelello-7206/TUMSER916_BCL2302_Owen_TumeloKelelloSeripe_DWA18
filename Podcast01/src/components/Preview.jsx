import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Season from './Season'; // Import the new component

const Preview = ({ podcastId, onFavoriteClick, onEpisodeComplete, onEpisodeProgress }) => {
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const handleEpisodeComplete = (episode) => {
    onEpisodeComplete(episode);
  };

  const handleEpisodeProgress = (episode, currentTime) => {
    onEpisodeProgress(episode, currentTime);
  };

  const handleFavoriteClick = (episode) => {
    if (podcast) {
      onFavoriteClick(episode); // Corrected: Pass the episode as a parameter to onFavoriteClick
    }
  };

  useEffect(() => {
    if (podcastId) {
      axios
        .get(`https://podcast-api.netlify.app/id/${podcastId}`)
        .then((response) => {
          setPodcast(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching podcast data:', error);
          setLoading(false);
        });
    }
  }, [podcastId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!podcast) {
    return <p>No data found for this podcast.</p>;
  }

  const handleSeasonClick = (season) => {
    setSelectedSeason((prevSeason) => (prevSeason === season ? null : season));
  };

  return (
    <div className="preview-container">
      <h2>{podcast.title}</h2>
      <p>{podcast.description}</p>
      {Array.isArray(podcast.seasons) ? (
        podcast.seasons.map((season, index) => (
          <Season
            key={index}
            season={season}
            selectedSeason={selectedSeason}
            onSeasonClick={handleSeasonClick}
            onEpisodeComplete={handleEpisodeComplete}
            onEpisodeProgress={handleEpisodeProgress}
            onFavoriteClick={handleFavoriteClick}
          />
        ))
      ) : (
        <p>No seasons found for this podcast.</p>
      )}
    </div>
  );
};

export default Preview;
