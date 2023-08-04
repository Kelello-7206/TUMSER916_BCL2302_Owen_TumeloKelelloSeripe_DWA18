import React, { useState } from 'react';

const EpisodeButton = ({ episode, onEpisodeClick, onFavoriteClick }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleEpisodeClick = () => {
    setShowDetails((prevState) => !prevState);
    onEpisodeClick(episode);
  };

  const handleFavoriteClick = () => {
    onFavoriteClick(episode);
  };

  return (
    <div>
      <button
        className={`episode-button${showDetails ? ' selected' : ''}`}
        onClick={handleEpisodeClick}
      >
        <h4>Episode No {episode.episode}</h4>
      </button>
      {showDetails && (
        <>
          <div className="episode-details">
            <h4>{episode.title}</h4>
            <p>Description: {episode.description}</p>
            <audio controls>
              <source src={episode.file} type="audio/mp3" />
            </audio>
          </div>
          <button onClick={handleFavoriteClick}>Favorite</button>
        </>
      )}
    </div>
  );
};

export default EpisodeButton;
