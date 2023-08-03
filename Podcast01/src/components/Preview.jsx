import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Favorite from './Favorite';

const Preview = ({ podcastId }) => {
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
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
  }, [podcastId]);
  
  const localStorageKey = 'favoriteEpisodes';

  useEffect(() => {
    // Load favorites from local storage on page load
    const storedFavorites = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedFavorites && Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites);
    }
  }, []);

  const addToFavorites = (episode) => {
    setFavorites((prevFavorites) => [...prevFavorites, episode]);
  };

  const removeFromFavorites = (episode) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favEpisode) => favEpisode !== episode)
    );
  };

  useEffect(() => {
    // Save favorites to local storage whenever it changes
    localStorage.setItem(localStorageKey, JSON.stringify(favorites));
  }, [favorites]);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="preview-container">
      <h2>{podcast.title}</h2>
      <p>{podcast.description}</p>
      <ul>
        {Array.isArray(podcast.seasons) ? (
          podcast.seasons.map((season, index) => (
            <li key={index}>
              <h3>{season.title}</h3>
              <img src={season.image} className="show-image" alt={season.title} />
              <ul>
                {Array.isArray(season.episodes) ? (
                  season.episodes.map((episode, index) => (
                    <li key={index}>
                      <h4>{episode.title}</h4>
                      <p>{episode.description}</p>
                      <audio controls>
                        <source src={episode.file} type="audio/mp3" />
                      </audio>
                      <button onClick={() => addToFavorites(episode)}>
                        Add to Favorites
                      </button>
                    </li>
                  ))
                ) : (
                  <li>No episodes found.</li>
                )}
              </ul>
            </li>
          ))
        ) : (
          <li>No seasons found.</li>
        )}
      </ul>

      {favorites.length > 0 && (
        <div>
          <h2>Your Favorites</h2>
          {favorites.map((episode, index) => (
            <Favorite key={index} episode={episode} removeFromFavorites={removeFromFavorites} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Preview;
