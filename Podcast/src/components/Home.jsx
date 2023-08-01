// import React, { useEffect } from "react";
// import axios from "axios";

// export default function Home() {
//   const [showPodcast, setPodcast] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);

//   useEffect(() => {
   
//     axios
//       .get('https://podcast-api.netlify.app/shows')
//       .then((response) => {
//         setPodcast(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching show data:', error);
//         setLoading(false);
//       });
//   }, []);

//   const genreData = {
//     1: 'Personal Growth',
//     2: 'True Crime and Investigative Journalism',
//     3: 'History',
//     4: 'Comedy',
//     5: 'Entertainment',
//     6: 'Business',
//     7: 'Fiction',
//     8: 'News',
//     9: 'Kids and Family',
//   };

//   const getGenres = (genreIds) => {
//     if (Array.isArray(genreIds)) {
//       return genreIds.map((id) => genreData[id]).join(', ');
//     } else {
//       return genreData[genreIds];
//     }
//   };

//   return (
//     <div className="home-container">
//       <h1>All Shows</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul className="show-list">
//           {showPodcast.map((show) => (
//             <li key={show.id}>
//               <a href={`/show/${show.id}`} className="show-link">
//                 <div className="show-info">
//                   <img src={show.image} className="show-image" alt={show.title} />
//                   <div className="show-details">
//                     <h3 className="show-title">{show.title}</h3>
//                     <p className="show-description">{show.description}</p>
//                     <p>Genre: {getGenres(show.genres)}</p>
//                     <p className="show-seasons">Numbers of seasons: {show.seasons}</p>
//                     <p className="show-updated">Updated: {show.updated}</p>
//                   </div>
//                 </div>
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }



import React, { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [showPodcast, setPodcast] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedShow, setSelectedShow] = React.useState(null);
  const [seasonsAndEpisodes, setSeasonsAndEpisodes] = React.useState([]);
  const BASE_URL = "https://podcast-api.netlify.app/id/";

  useEffect(() => {
    axios
      .get("https://podcast-api.netlify.app/shows")
      .then((response) => {
        setPodcast(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching show data:", error);
        setLoading(false);
      });
  }, []);

  const genreData = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const getGenres = (genreIds) => {
    if (Array.isArray(genreIds)) {
      return genreIds.map((id) => genreData[id]).join(", ");
    } else {
      return genreData[genreIds];
    }
  };

  const handleShowClick = (showId) => {
    // Check if the show is already selected to avoid unnecessary API calls
    if (selectedShow && selectedShow.id === showId) {
      return;
    }

    const selectedShowData = showPodcast.find((show) => show.id === showId);
    setSelectedShow(selectedShowData);

    // Fetch seasons and episodes for the selected show
    axios
      .get(`${BASE_URL}${showId}`)
      .then((response) => {
        setSeasonsAndEpisodes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching seasons and episodes:", error);
        setSeasonsAndEpisodes([]); // Reset seasons and episodes on error
      });
  };

  return (
    <div className="home-container">
      <h1>All Shows</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="show-list">
            {showPodcast.map((show) => (
              <li key={show.id}>
                <button onClick={() => handleShowClick(show.id)} className="show-link">
                  {show.title}
                  <br />
                  {getGenres(show.genres)}
                </button>
              </li>
            ))}
          </ul>
          {selectedShow && (
            <div className="preview-container">
              <h2>{selectedShow.title}</h2>
              {/* ... (unchanged) */}
              {seasonsAndEpisodes.length > 0 ? (
                <div>
                  <h3>Seasons and Episodes</h3>
                  <ul>
                    {seasonsAndEpisodes.map((season, index) => (
                      <li key={index}>
                        <p>Season {index + 1}</p>
                        <ul>
                          {season.episodes.map((episode, episodeIndex) => (
                            <li key={episodeIndex}>
                              <p>Episode {episodeIndex + 1}</p>
                              <p>Title: {episode.title}</p>
                              <p>Description: {episode.description}</p>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No seasons and episodes found for this show.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
