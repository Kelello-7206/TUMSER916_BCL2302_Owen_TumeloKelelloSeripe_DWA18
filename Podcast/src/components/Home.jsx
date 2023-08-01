import React, { useEffect } from "react";
import axios from "axios"; // Import Axios


export default function Home() {
  const [showPodcast, setPodcast] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Fetch all show data from the API using Axios
    axios.get('https://podcast-api.netlify.app/shows')
      .then((response) => {
        setPodcast(response.data); // Use response.data instead of calling response.json()
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
              {/* Pass the show.id to the Preview component */}
              <Preview showId={show.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}







