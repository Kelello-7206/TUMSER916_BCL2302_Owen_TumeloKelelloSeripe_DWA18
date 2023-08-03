import React from 'react';

const Favorite = ({ episode, removeFromFavorites }) => {
  const { show, season, title, description } = episode;

  const handleRemoveClick = () => {
    removeFromFavorites(episode);
  };

  return (
    <div className="favorite-item">
      <h3>{show}</h3>
      <h4>{season}</h4>
      <h4>{title}</h4>
      <p>{description}</p>
      <button onClick={handleRemoveClick}>Remove from Favorites</button>
    </div>
  );
};

export default Favorite;
