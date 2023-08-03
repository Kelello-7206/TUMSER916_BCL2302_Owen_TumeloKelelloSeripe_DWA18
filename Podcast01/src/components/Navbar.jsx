import React from 'react';
import '../index.css';

const Navbar = ({ onNavigate }) => {
  const handleNavigationClick = (page) => {
    onNavigate(page);
  };

  return (
    <nav className="navbar">
      <button onClick={() => handleNavigationClick('home')}>Home</button>
      <button onClick={() => handleNavigationClick('favorite')}>Favorite</button>
      <button onClick={() => handleNavigationClick('preview')}>Preview</button>
      {/* You can add more buttons here for additional pages */}
    </nav>
  );
};

export default Navbar;
