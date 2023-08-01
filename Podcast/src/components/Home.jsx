import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Preview from './Preview' // Import the Preview component

export default function Home() {
  const [showPodcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState(null); // Track the selected podcast

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

  const handlePodcastClick = (event , podcast) => {
    event.preventDefault();
    setSelectedPodcast(podcast); // Set the selected podcast when it's clicked
  };

  return (
    <div className="home-container">
      <h1>All Shows</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="show-list">
          {showPodcast.map((show) => (
            <li key={show.id}>
              <a href={`/show/${show.id}`} className="show-link"  onClick={(event) => handlePodcastClick(event,show)}>
                <div className="show-info">
                  <img src={show.image} className="show-image" alt={show.title} />
                  <div className="show-details">
                    <h3 className="show-title">{show.title}</h3>
                    <p className="show-description">{show.description}</p>
                    <p>Genre: {getGenres(show.genres)}</p>
                    <p className="show-seasons">Numbers of seasons: {show.seasons}</p>
                    <p className="show-updated">Updated: {show.updated}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

   {selectedPodcast && <Preview podcastId={selectedPodcast.id} />}
    </div>
  );
}







// {
//   "id": 
//   "title": 
//   "description": 
//   "seasons": [
//     {
//       "season":
//       "title": 
//       "image": 
//       "episodes": [
//         {
//           "title": 
//           "description": 
//           "episode":
//           "file":
//         },
//       }
//     }





