// Favorite.js

import React, { useEffect, useState } from 'react';
import Search from './Search';

const Favorite = ({ favorites, setFavorites, removeFromFavorites }) => {
  const [localFavorites, setLocalFavorites] = useState([]);

  useEffect(() => {
    setLocalFavorites(favorites); // Update localFavorites when favorites prop changes
  }, [favorites]);

  // Function to update the data with searched and sorted items
  const updateData = (data) => {
    setLocalFavorites(data);
  };

  return (
    <div className="favorite-container">
      <h1>Your Favorites</h1>
      {/* Include the Search component */}
      <Search data={favorites} updateData={updateData} />
      {localFavorites.length > 0 ? (
        <ul className="favorite-list">
          {localFavorites.map((episode, index) => (
            <li key={index} className="favorite-item">
              {/* Your favorite item UI here */}
              <h4>{episode.title}</h4>
              <p>{episode.description}</p>
              {/* Add a button to remove the episode from favorites */}
              <button onClick={() => removeFromFavorites(episode)}>Remove from Favorites</button>
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
