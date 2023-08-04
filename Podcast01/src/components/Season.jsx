import React, { useState } from 'react';
import EpisodeButton from './EpisodeButton'; // Import the EpisodeButton component

const Season = ({ season, selectedSeason, onSeasonClick, onFavoriteClick }) => {
  const handleSeasonClick = (season) => {
    onSeasonClick(season);
  };

  return (
    <div>
      <button
        className={`season-button${selectedSeason === season ? ' selected' : ''}`}
        onClick={() => handleSeasonClick(season)}
      >
        <h2>Season: {season.season}</h2>
        <img src={season.image} className="show-image" alt={season.title} />
      </button>
      {selectedSeason === season && Array.isArray(season.episodes) && (
        <ul className={`episodes-list${selectedSeason === season ? ' show-episodes' : ''}`}>
          {season.episodes.map((episode, episodeIndex) => (
            <li key={episodeIndex}>
              <EpisodeButton
                episode={episode}
                onEpisodeClick={() => {}} // Dummy function, you can replace it with your actual functionality
                onFavoriteClick={onFavoriteClick}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Season;
