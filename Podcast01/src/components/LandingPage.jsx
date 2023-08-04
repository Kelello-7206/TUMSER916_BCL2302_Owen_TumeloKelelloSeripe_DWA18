// LandingPage.js
import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';

const LandingPage = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <>
      {user ? (
        <Home user={user} />
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <SignUp onLogin={handleLogin} />
        </>
      )}
    </>
  );
};

export default LandingPage;
