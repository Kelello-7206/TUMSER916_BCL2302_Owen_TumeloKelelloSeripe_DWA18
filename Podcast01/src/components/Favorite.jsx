// Favorite.js
import React, { useEffect, useState } from 'react';
import { supabase } from './App'; // Import the Supabase client

const Favorite = ({ user }) => {
  const [localFavorites, setLocalFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id);
      if (error) {
        console.error('Error fetching favorites:', error.message);
      } else {
        setLocalFavorites(data);
      }
      setLoading(false);
    };
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const handleRemoveFromFavorites = async (episode) => {
    const { error } = await supabase.from('favorites').delete().eq('id', episode.id);
    if (error) {
      console.error('Error removing from favorites:', error.message);
    } else {
      setLocalFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== episode.id));
    }
  };

  return (
    <div className="favorite-container">
      <h1>Your Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : localFavorites.length > 0 ? (
        <ul className="favorite-list">
          {localFavorites.map((episode) => (
            <li key={episode.id} className="favorite-item">
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
