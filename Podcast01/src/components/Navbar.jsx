import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({

  navbar: {
    zIndex: 1000,
    position: 'sticky',
    top: 0,
  },

  toolbar: {
    backgroundColor: 'black',    
  },

  navTitle: {
    flexGrow: 0.9,
    paddingLeft: theme.spacing(10),
  },

  buttonGroup: {
    '& > button': {
      color: 'white',
      backgroundColor: 'green',
      border: '1px solid blue',
      marginLeft: theme.spacing(1),
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.navbar}>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.navTitle}>
          Your Logo
        </Typography>
        <div className={classes.buttonGroup}>
          <Button>Home</Button>
          <Button>Preview</Button>
          <Button>Favorite</Button>
          <Button>History</Button>
        </div>
      </Toolbar>
    </AppBar>
    </div>
  );
};

export default Navbar;
