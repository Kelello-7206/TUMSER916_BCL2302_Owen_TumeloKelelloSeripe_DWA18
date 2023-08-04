import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
          <div key={index}> {/* Change the key to use a unique identifier (e.g., season ID) */}
            {/* Use a button to display the season title and image */}
            <button
              className={`season-button${selectedSeason === season ? ' selected' : ''}`}
              onClick={() => handleSeasonClick(season)}
            >
              <h2>Season: {season.season}</h2>
              <h3>Title: {season.title}</h3>
              <img src={season.image} className="show-image" alt={season.title} />
            </button>
            {selectedSeason === season && Array.isArray(season.episodes) && (
              <ul className={`episodes-list${selectedSeason === season ? ' show-episodes' : ''}`}>
                {season.episodes.map((episode, episodeIndex) => (
                  <li key={episodeIndex}> {/* Change the key to use a unique identifier (e.g., episode ID) */}
                    <h4>{episode.title}</h4>
                    <h4>Episode No {episode.episode}</h4>
                    <p>Description: {episode.description}</p>
                    <audio
                      controls
                      onEnded={() => handleEpisodeComplete(episode)}
                      onTimeUpdate={(e) => handleEpisodeProgress(episode, e.target.currentTime)}
                    >
                      <source src={episode.file} type="audio/mp3" />
                    </audio>
                    <button onClick={() => handleFavoriteClick(episode)}>Favorite</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p>No seasons found for this podcast.</p>
      )}
    </div>
  );
};

export default Preview;
