import React, { useState, useEffect } from 'react';

const Favorite = ({ favorites, removeFromFavorites }) => {
  const [localFavorites, setLocalFavorites] = useState([]);

  useEffect(() => {
    setLocalFavorites(favorites); // Update localFavorites when favorites prop changes
  }, [favorites]);

  const handleRemoveFromFavorites = (episode) => {
    removeFromFavorites(episode); // Call the removeFromFavorites function passed as a prop
  };

  useEffect(() => {
    setLocalFavorites(favorites); // Update localFavorites when favorites prop changes
  }, [favorites]);

  return (
    <div className="favorite-container">
      <h1>Your Favorites</h1>
      {localFavorites.length > 0 ? (
        <ul className="favorite-list">
          {localFavorites.map((episode, index) => (
            <li key={index} className="favorite-item">
              <h4>Season: {episode.season}</h4>
              <h4>Title: {episode.title}</h4>
              <h4>Episode: {episode.episode}</h4>
              <p>Description: {episode.description}</p>
              <button onClick={() => handleRemoveFromFavorites(episode)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite episodes found.</p>
      )}
    </div>
  );
};

export default Favorite;
