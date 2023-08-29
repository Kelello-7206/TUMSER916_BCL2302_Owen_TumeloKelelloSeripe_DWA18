import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Card, CardContent, CardMedia, Container } from '@mui/material';

const Preview = ({ selectedItem }) => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
    setSelectedEpisode(null);
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <Container sx={{ marginTop: '2rem' }}>
      {selectedItem && (
        <Card elevation={3}>
          <CardMedia
            component="img"
            height="300"
            image={selectedItem.image}
            alt={selectedItem.title}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedItem.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {selectedItem.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Seasons:</Typography>
            <List>
              {selectedItem.seasons.map((season) => (
                <ListItem
                  key={season.season}
                  button
                  onClick={() => handleSeasonClick(season)}
                >
                  <ListItemText primary={`Season ${season.season}`} />
                </ListItem>
              ))}
            </List>
            {selectedSeason && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Episodes:</Typography>
                <List>
                  {selectedSeason.episodes.map((episode) => (
                    <ListItem
                      key={episode.episode}
                      button
                      onClick={() => handleEpisodeClick(episode)}
                    >
                      <ListItemText primary={episode.title} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            {selectedEpisode && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Selected Episode:</Typography>
                <Typography variant="subtitle1">
                  {selectedEpisode.title}
                </Typography>
                <Typography variant="body2">
                  {selectedEpisode.description}
                </Typography>
                <audio controls src={selectedEpisode.file} />
              </>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Preview;
