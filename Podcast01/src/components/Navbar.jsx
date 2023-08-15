import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align buttons to the right
  },
  title: {
    flexGrow: 1,
    textAlign: 'left', // Align title to the left
  },
  // Add border to the buttons
  borderedButton: {
    border: '1px solid #333', // Customize the border properties
    margin: '0 8px', // Add some spacing between buttons
  },
  // Change navbar color
  appBar: {
    backgroundColor: '#2196f3', // Change to your desired color
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Navbar Title
          </Typography>
          <div className={classes.buttonContainer}>
            {/* Apply the borderedButton class to each button */}
            <Button className={classes.borderedButton} color="inherit">
              Home
            </Button>
            <Button className={classes.borderedButton} color="inherit">
              Favorite
            </Button>
            <Button className={classes.borderedButton} color="inherit">
              History
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
