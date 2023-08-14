import React from "react";
import {AppBar , Toolbar , Button, Typography } from '@mui/material'
import {makeStyles} from '@emotion/styled'
import '../layouts/Navbar.css'


const useStyles = makeStyles((theme) => ({
    // No need for styles here since we're using the external CSS
  }));

  
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