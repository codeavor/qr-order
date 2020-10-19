import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

NavBar.propTypes = {
  back: PropTypes.bool,
  text: PropTypes.string,
  search: PropTypes.bool,
};

export default function NavBar({ back, text, search }) {
  const classes = useStyles();

  const BarButton = ({ edge = "start", name, icon }) => {
    return (
      <IconButton
        edge={edge}
        className={classes.menuButton}
        aria-label={`${name}-button`}
        data-testid={`${name}-button`}
      >
        {icon}
      </IconButton>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" data-testid="nav-bar">
        <Toolbar>
          {back ? (
            <BarButton name="back" icon={<KeyboardBackspaceIcon />} />
          ) : null}
          <div className={classes.grow} />
          <Typography variant="h5">{text}</Typography>
          <div className={classes.grow} />
          {search ? (
            <BarButton edge="end" name="search" icon={<SearchIcon />} />
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
