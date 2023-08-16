import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* Your other components */}
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
