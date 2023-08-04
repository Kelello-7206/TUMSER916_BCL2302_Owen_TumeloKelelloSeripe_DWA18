import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search'; // Import the Search component

const Home = ({ onPodcastClick, selectedPodcast }) => {
  const [showPodcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    axios
      .get('https://podcast-api.netlify.app/shows')
      .then((response) => {
        setPodcast(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching show data:', error);
        setLoading(false);
      });
  }, []);

  const genreData = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  const getGenres = (genreIds) => {
    if (Array.isArray(genreIds)) {
      return genreIds.map((id) => genreData[id]).join(', ');
    } else {
      return genreData[genreIds];
    }
  };

  const handlePodcastClick = (podcast) => {
    onPodcastClick(podcast);
  };

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Function to update the data with searched and sorted items
  const updateData = (data) => {
    setPodcast(data);
  };

  return (
    <div className="home-container">
      <h1>All Shows</h1>
      <Search data={showPodcast} updateData={updateData} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="show-list">
            {showPodcast.map((show) => (
              <li key={show.id} onClick={() => handlePodcastClick(show)}>
                <div className={`show-info ${show.id === selectedPodcast?.id ? 'selected' : ''}`}>
                  <img src={show.image} className="show-image" alt={show.title} />
                  <div className="show-details">
                    <h3 className="show-title">{show.title}</h3>
                    <p className="show-description">
                      {show.description.split('\n').slice(0, 3).join('\n')}
                      {show.description.split('\n').length > 3 && !showFullDescription && '...'}
                    </p>
                    {show.description.split('\n').length > 3 && (
                      <button onClick={toggleDescription}>
                        {showFullDescription ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                    <p>Genre: {getGenres(show.genres)}</p>
                    <p className="show-seasons">Numbers of seasons: {show.seasons}</p>
                    <p className="show-updated">Updated: {formatDate(show.updated)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
