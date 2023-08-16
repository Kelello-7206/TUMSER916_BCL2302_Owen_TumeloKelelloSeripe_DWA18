import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: 'black',
  },
  navTitle: {
    flexGrow: 1,
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    '& > button': {
      backgroundColor: 'green',
      border: '1px solid blue',
      marginLeft: theme.spacing(2),
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.navbar}>
        <Typography variant="h5" className={classes.navTitle}>
          Your Logo
        </Typography>
        <div className={classes.buttonGroup}>
          <Button>Home</Button>
          <Button>Favorite</Button>
          <Button>History</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
