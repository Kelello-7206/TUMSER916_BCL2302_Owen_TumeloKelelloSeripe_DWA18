import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Preview = ({ podcastId, onFavoriteClick, onEpisodeComplete, onEpisodeProgress }) => { // Add 'onFavoriteClick' prop
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEpisodeComplete = () => {
    // Call the function from the App component
    onEpisodeComplete(podcast);
  };

  const handleEpisodeProgress = (currentTime) => {
    // Call the function from the App component
    onEpisodeProgress(podcast, currentTime);
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

  const handleFavoriteClick = () => {
    if (podcast) {
      onFavoriteClick(podcast); // Call the 'onFavoriteClick' function to add the selected podcast to favorites
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!podcast) {
    return <p>No data found for this podcast.</p>;
  }

  return (
    <div className="preview-container">
      <h2>{podcast.title}</h2>
      <p>{podcast.description}</p>
      {Array.isArray(podcast.seasons) ? (
        podcast.seasons.map((season, index) => (
          <div key={index}>
            <h3>{season.title}</h3>
            <img src={season.image} className="show-image" alt={season.title} />
            {Array.isArray(season.episodes) ? (
              <ul>
                {season.episodes.map((episode, episodeIndex) => (
                  <li key={episodeIndex}>
                    <h4>{episode.title}</h4>
                    <p>{episode.description}</p>
                    <audio
                      controls
                      onEnded={handleEpisodeComplete}
                      onTimeUpdate={(e) => handleEpisodeProgress(e.target.currentTime)}
                    >
                      <source src={episode.file} type="audio/mp3" />
                    </audio>
                    <button onClick={() => onFavoriteClick(episode)}>Favorite</button> {/* Use the onFavoriteClick function prop */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No episodes found for this season.</p>
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