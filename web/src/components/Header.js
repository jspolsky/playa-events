import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import EventIcon from "@material-ui/icons/Event";

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
          <Button
            color="default"
            onClick={handleNewEvent}
            variant="contained"
            startIcon={<EventIcon />}
          >
            New Event
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export const Header = ({ title, handleNewEvent }) => {
  return (
    <>
      <ButtonAppBar title={title} handleNewEvent={handleNewEvent} />
    </>
  );
};
