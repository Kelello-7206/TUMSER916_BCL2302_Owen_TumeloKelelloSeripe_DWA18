import React, { useState, useEffect } from 'react';

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

  return (
    <div className="history-container">
      <h1>Listening History</h1>
      {listeningHistory.length > 0 ? (
        <ul>
          {listeningHistory.map((episode, index) => (
            <li key={index}>
              <p>Show: {episode.show}</p>
              <p>Episode: {episode.episode}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No listening history found.</p>
      )}
      {lastListened.show && lastListened.episode && (
        <div>
          <h2>Last Listened Episode</h2>
          <p>Show: {lastListened.show}</p>
          <p>Episode: {lastListened.episode}</p>
        </div>
      )}
      <button onClick={handleResetProgress}>Reset Listening Progress</button>
    </div>
  );
};

export default History;
