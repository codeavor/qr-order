import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
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
  menu: PropTypes.array,
};

export default function NavBar({ back, text, search, menu }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          {!back ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="back-button"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          ) : null}
          <div className={classes.grow} />
          <Typography variant="h5">{text}</Typography>
          <div className={classes.grow} />
          {search ? (
            <IconButton
              edge="end"
              className={classes.menuButton}
              aria-label="search-button"
            >
              <SearchIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
