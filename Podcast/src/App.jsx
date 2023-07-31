import React, { useEffect } from "react"
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import PreviewBar from "./components/PreviewBar"


function App() {

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

  return (
    <>
      <Navbar />
      <PreviewBar shows={showPodcast} loading={loading} />

      <Home shows={showPodcast} loading={loading} />
    </>
  )
}

export default App
