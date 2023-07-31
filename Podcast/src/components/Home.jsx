import React, { useEffect } from "react";

export default function Home() {
  const [showPodcast, setPodcast] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Fetch all show data from the API
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setPodcast(data);
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

  return (
    <div className="home-container">
      <h1>All Shows</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="show-list">
          {showPodcast.map((show) => (
            <li key={show.id}>
              <a href={`/show/${show.id}`} className="show-link">
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
    </div>
  );
}
