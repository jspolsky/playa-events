import React from "react";
import banner from "../assets/header.jpg";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ButtonAppBar = ({ title, handleNewEvent }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={handleNewEvent}>
            New Event
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export const Header = ({ title, handleNewEvent }) => {
  // Image is from https://gallery.burningman.org/asset/e18ccfb6-4558-427e-8118-493bffe148e5?i=2&q=playa+info
  // Photo by Jini Sachse, 2019

  return (
    <>
      <img className="img-fluid w-100" src={banner} alt="Playa Info" />
      <ButtonAppBar title={title} handleNewEvent={handleNewEvent} />
    </>
  );
};
