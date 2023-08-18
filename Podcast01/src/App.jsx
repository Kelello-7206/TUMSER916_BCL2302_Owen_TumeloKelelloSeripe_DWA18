import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
        <Home />
    </div>
  </ThemeProvider>
  );
}

export default App;
