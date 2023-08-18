import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Container, Grid } from '@mui/material';
import Navbar from './Navbar';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true); // Declare the loading state

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('https://podcast-api.netlify.app/shows');
        setShows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shows:', error);
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <br/>
      <Container>
        <Grid container spacing={2}>
          {shows.map((show) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
              <Card>
                <CardMedia component="img" height="140" image={show.previewImage} alt={show.name} />
                <CardContent>
                  <Typography variant="h6">{show.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Seasons: ${show.seasons}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Last Updated: ${new Date(show.lastUpdated).toDateString()}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Genres: ${show.genres.join(', ')}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
