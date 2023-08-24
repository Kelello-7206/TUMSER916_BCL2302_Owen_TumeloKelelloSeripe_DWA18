import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Container, Grid } from '@mui/material';
import Navbar from './Navbar';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
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
    <>
      <Navbar />
      <br/>
      <Container sx={{ padding: 0 }}>
        <Grid container spacing={3} margin={0}>
          {shows.map((show) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
              <Card>
                <CardMedia component="img" height="100%" width="100%" image={show.image} alt={show.name} />
                <CardContent>
                  <Typography variant="h7" fontWeight="bold">
                    {show.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: 'bold' }}>Description:</span> {show.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: 'bold' }}>Seasons:</span> {show.seasons}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: 'bold' }}>Last Updated:</span> {formatDate(show.updated)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: 'bold' }}>Genres:</span> {getGenres(show.genres)}
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
