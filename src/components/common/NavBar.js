import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import { useHistory, withRouter } from "react-router";
import NavBarButton from "./NavBarButton";

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

NavBar.propTypes = {
  text: PropTypes.string,
  back: PropTypes.bool,
};

export function NavBar({ text, back = true }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="fixed" color="default" data-testid="nav-bar">
      <Toolbar>
        {back ? (
          <NavBarButton
            name="back"
            icon={<KeyboardBackspaceIcon />}
            onClick={() => history.goBack()}
          />
        ) : (
          <NavBarButton edge="end" disabled />
        )}
        <div className={classes.grow} />
        <Typography variant="h6">{text}</Typography>
        <div className={classes.grow} />
        <NavBarButton edge="end" disabled />
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(NavBar);
