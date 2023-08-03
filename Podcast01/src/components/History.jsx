import React, { useEffect, useState } from 'react';

const History = () => {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [audioRef, setAudioRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const localStorageKey = 'listeningHistory';
  const accuracyPeriod = 10; // 10 seconds accuracy

  useEffect(() => {
    // Load last listened episode from local storage on page load
    const storedEpisode = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedEpisode) {
      setCurrentEpisode(storedEpisode);
    }

    // Add event listener to prompt user before closing the page if audio is playing
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

  useEffect(() => {
    // Save last listened episode to local storage whenever it changes
    localStorage.setItem(localStorageKey, JSON.stringify(currentEpisode));
  }, [currentEpisode]);

  const handlePlayPause = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.currentTime;
    setProgress(currentTime);
  };

  const handleEpisodeEnd = () => {
    if (currentEpisode) {
      // Save the current episode progress in local storage as "completed" if listened all the way through
      const completedEpisode = { ...currentEpisode, completed: true };
      localStorage.setItem(localStorageKey, JSON.stringify(completedEpisode));
      setCurrentEpisode(null);
    }
  };

  const handleResetProgress = () => {
    // Reset all progress by clearing the local storage key
    localStorage.removeItem(localStorageKey);
    setCurrentEpisode(null);
  };

  return (
    <div>
      <h2>Audio Player</h2>
      {currentEpisode && (
        <div>
          <h3>{currentEpisode.show}</h3>
          <h4>{currentEpisode.season}</h4>
          <h4>{currentEpisode.title}</h4>
          <audio
            ref={(element) => setAudioRef(element)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEpisodeEnd}
          >
            <source src={currentEpisode.file} type="audio/mp3" />
          </audio>
          <div>
            <p>{`${Math.floor(progress)} / ${Math.floor(audioRef?.duration || 0)}`}</p>
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          </div>
        </div>
      )}
      <button onClick={handleResetProgress}>Reset Progress</button>
    </div>
  );
};

export default History;
