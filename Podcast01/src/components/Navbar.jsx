import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'red',
  },
  title: {
    flexGrow: 1,
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  greenButton: {
    color: 'white',
    backgroundColor: 'green',
    border: '1px solid white',
    marginLeft: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'darkgreen',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" >
      <Toolbar className={classes.appBar}>
        <Typography variant="h5" className={classes.title}>
          Your Logo
        </Typography>
        <div className={classes.buttonGroup}>
          <Button className={classes.greenButton}>Home</Button>
          <Button className={classes.greenButton}>Favorite</Button>
          <Button className={classes.greenButton}>History</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
