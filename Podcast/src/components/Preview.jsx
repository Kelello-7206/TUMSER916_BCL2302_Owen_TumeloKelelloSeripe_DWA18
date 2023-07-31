import React, { useState, useEffect } from "react";

const Preview = ({ showId }) => {
  const [showData, setShowData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    // Fetch show data from the API based on the showId
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        setShowData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching show data:', error);
        setLoading(false);
      });
  }, [showId]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(Number(event.target.value));
  };

  return (
    <div className="preview-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{showData.title}</h2>
          <p>{showData.description}</p>
          <p>Genre: {getGenres(showData.genres)}</p>
          <p>Numbers of seasons: {showData.seasons}</p>
          <p>Updated: {showData.updated}</p>

          <h3>Seasons</h3>
          <select onChange={handleSeasonChange} value={selectedSeason}>
            {Array.from({ length: showData.seasons }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Season {index + 1}
              </option>
            ))}
          </select>

          <h3>Episodes</h3>
          <ul className="episode-list">
            {showData.episodes
              .filter((episode) => episode.season === selectedSeason)
              .map((episode) => (
                <li key={episode.id}>
                  <p>Episode {episode.number}</p>
                  <p>{episode.title}</p>
                  <audio controls>
                    <source src={episode.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

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

export default Preview;
