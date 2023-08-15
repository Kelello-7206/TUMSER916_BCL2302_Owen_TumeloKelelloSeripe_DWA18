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
    justifyContent: 'flex-start',
  },
  title: {
    flexGrow: 1,
    textAlign: 'right',
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.buttonContainer}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Favorite</Button>
            <Button color="inherit">History</Button>
          </div>
          <Typography variant="h6" className={classes.title}>
            Navbar Title
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
