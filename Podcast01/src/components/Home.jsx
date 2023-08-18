import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Homepage from '../pages/homepage';

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('https://podcast-api.netlify.app/shows');
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  return <Homepage shows={shows} />;
};

export default Home;
