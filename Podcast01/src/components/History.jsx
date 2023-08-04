import React, { useState, useEffect } from 'react';
import Preview from './Preview'

const History = () => {
  const [listeningHistory, setListeningHistory] = useState(
    JSON.parse(localStorage.getItem('listeningHistory')) || []
  );
  const [lastListened, setLastListened] = useState(
    JSON.parse(localStorage.getItem('lastListened')) || {}
  );

  useEffect(() => {
    localStorage.setItem('listeningHistory', JSON.stringify(listeningHistory));
  }, [listeningHistory]);

  useEffect(() => {
    localStorage.setItem('lastListened', JSON.stringify(lastListened));
  }, [lastListened]);

  const handleResetProgress = () => {
    setListeningHistory([]);
    setLastListened({});
  };

  // Move the handleEpisodeComplete and handleEpisodeProgress functions here
  const handleEpisodeComplete = (episode) => {
    if (!listeningHistory.some((item) => item.id === episode.id)) {
      setListeningHistory((prevHistory) => [...prevHistory, episode]);
    }
  };

  const handleEpisodeProgress = (episode, currentTime) => {
    if (currentTime >= episode.duration - 10) {
      setLastListened({
        show: episode.show,
        episode: episode.title,
        progress: currentTime,
      });
    }
  };

  return (
    <div className="history-container">
      <h1>Listening History</h1>
      {listeningHistory.length > 0 ? (
        <ul>
          {listeningHistory.map((episode, index) => (
            <li key={index}>
              <p>Show: {episode.show}</p>
              <p>Episode: {episode.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No listening history found.</p>
      )}
      <button onClick={handleResetProgress}>Reset Listening Progress</button>
      {/* Pass the handleEpisodeComplete and handleEpisodeProgress as props */}
      <Preview
        onEpisodeComplete={handleEpisodeComplete}
        onEpisodeProgress={handleEpisodeProgress}
      />
    </div>
  );
};

export default History;
