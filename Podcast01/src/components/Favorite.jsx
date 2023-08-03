import React, { useEffect, useState } from 'react';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  const localStorageKey = 'favoriteEpisodes';

  useEffect(() => {
    // Load favorites from local storage on page load
    const storedFavorites = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedFavorites && Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites);
    }
  }, []);

  const removeFromFavorites = (episode) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favEpisode) => favEpisode !== episode)
    );
  };

  useEffect(() => {
    // Save favorites to local storage whenever it changes
    localStorage.setItem(localStorageKey, JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="favorite-container">
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        favorites.map((episode, index) => (
          <div key={index} className="favorite-item">
            <h3>{episode.show}</h3>
            <h4>{episode.season}</h4>
            <h4>{episode.title}</h4>
            <p>{episode.description}</p>
            <button onClick={() => removeFromFavorites(episode)}>Remove from Favorites</button>
          </div>
        ))
      ) : (
        <p>No favorite episodes found.</p>
      )}
    </div>
  );
};

export default Favorite;