import React from "react";
import {AppBar , Toolbar , Button, Typography } from '@mui/material'
import '../layouts/Navbar.css'

  
function Navbar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Favorite</Button>
            <Button color="inherit">History</Button>
            <Typography variant="h6" className="title">
              Your H1 Content
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  export default Navbar;