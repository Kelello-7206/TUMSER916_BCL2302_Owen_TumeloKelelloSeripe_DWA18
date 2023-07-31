import React, { useEffect } from "react"
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home'


function App() {

  const [shows, setShows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Fetch all show data from the API
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching show data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Home shows={shows} loading={loading} />
    </>
  )
}

export default App
