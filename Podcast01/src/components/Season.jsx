import React from 'react';

const Season = ({ season, selectedSeason, onSeasonClick, onEpisodeComplete, onEpisodeProgress, onFavoriteClick }) => {
  return (
    <div>
      <button
        className={`season-button${selectedSeason === season ? ' selected' : ''}`}
        onClick={() => onSeasonClick(season)}
      >
        <h2>Season: {season.season}</h2>
        <h3>Title: {season.title}</h3>
        <img src={season.image} className="show-image" alt={season.title} />
      </button>
      {selectedSeason === season && Array.isArray(season.episodes) && (
        <ul className={`episodes-list${selectedSeason === season ? ' show-episodes' : ''}`}>
          {season.episodes.map((episode, episodeIndex) => (
            <li key={episodeIndex}>
              <h4>{episode.title}</h4>
              <h4>Episode No {episode.episode}</h4>
              <p>Description: {episode.description}</p>
              <audio
                controls
                onEnded={() => onEpisodeComplete(episode)}
                onTimeUpdate={(e) => onEpisodeProgress(episode, e.target.currentTime)}
              >
                <source src={episode.file} type="audio/mp3" />
              </audio>
              <button onClick={() => onFavoriteClick(episode)}>Favorite</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Season;
