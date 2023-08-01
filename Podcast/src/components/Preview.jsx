import React from 'react';
import axios from 'axios';

export default function Preview({ id }) {
  const [podcast, setPodcast] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`https://podcast-api.netlify.app/id/${id}`)
      .then((response) => {
        setPodcast(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching show data:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
          <p>Genre: {podcast.genres.join(', ')}</p>
          <p>Numbers of seasons: {podcast.seasons}</p>
          <p>Updated: {podcast.updated}</p>
        </div>
      )}
    </div>
  );
}
