import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { makeStyles } from '';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'right',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.buttonGroup}>
            <Button className={classes.button} color="inherit">Home</Button>
            <Button className={classes.button} color="inherit">Favorite</Button>
            <Button className={classes.button} color="inherit">History</Button>
          </div>
          <Typography variant="h6" className={classes.title}>
            Your App Title
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
