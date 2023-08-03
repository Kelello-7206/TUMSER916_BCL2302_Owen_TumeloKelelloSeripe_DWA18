import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorite from './components/Favorite';
import Preview from './components/Preview';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar onNavigate={handleNavigation} />
      {currentPage === 'home' && <Home />}
      {currentPage === 'favorite' && <Favorite />}
      {currentPage === 'preview' && <Preview />}
    </>
  );
}

export default App;
