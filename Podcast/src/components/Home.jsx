import React from "react"
import { Link } from 'react-router-dom';
import '../index.css'


export default function Home() {

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
 
  );


}

