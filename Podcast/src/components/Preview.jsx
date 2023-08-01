import React from 'react';

const Preview = ({ podcast }) => {
  return (
    <div className="preview-container">
      <h2>{podcast.title}</h2>
      <p>{podcast.description}</p>
      <ul>
        {podcast.seasons.map((season, index) => (
          <li key={index}>
            <h3>{season.title}</h3>
            <img src={season.image} alt={season.title} />
            <ul>
              {season.episodes.map((episode, index) => (
                <li key={index}>
                  <h4>{episode.title}</h4>
                  <p>{episode.description}</p>
                  <audio controls>
                    <source src={episode.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Preview;
