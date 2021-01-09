import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import NavBarButton from "../common/NavBarButton";
import C from "../../constants";

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

MenuNavBar.propTypes = {
  text: PropTypes.string,
  removeOrder: PropTypes.func,
};

MenuNavBar.defaultProps = {
  removeOrder: () => {},
};

export default function MenuNavBar({ text, removeOrder }) {
  const classes = useStyles();
  const orderId = window.localStorage.getItem(C.ORDER_ID);

  const isCustomer = () => {
    return window.localStorage.getItem(C.ROLE) === C.CUSTOMER_ROLE;
  };

  return (
    <AppBar position="static" color="default" data-testid="nav-bar">
      <Toolbar>
        <NavBarButton
          name="back"
          icon={<KeyboardBackspaceIcon />}
          disabled={isCustomer()}
          onClick={() => removeOrder(orderId)}
        />
        <div className={classes.grow} />
        <Typography variant="h6">{text}</Typography>
        <div className={classes.grow} />
        <NavBarButton edge="end" disabled />
      </Toolbar>
    </AppBar>
  );
}
