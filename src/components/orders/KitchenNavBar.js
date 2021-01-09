import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LoopIcon from "@material-ui/icons/Loop";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import NavBarButton from "../common/NavBarButton";
import C from "../../constants";

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

KitchenNavBar.propTypes = {
  statusFilter: PropTypes.string,
  setStatusFilter: PropTypes.func,
  text: PropTypes.string,
  createOrder: PropTypes.func,
};

KitchenNavBar.defaultProps = {
  setStatusFilter: () => {},
  createOrder: () => {},
};

export default function KitchenNavBar({
  statusFilter,
  setStatusFilter,
  text,
  createOrder,
}) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="default" data-testid="nav-bar">
      <Toolbar>
        <NavBarButton
          name="status"
          icon={<LoopIcon style={{ fontSize: "1.8rem" }} />}
          onClick={() => {
            setStatusFilter(statusFilter === "sent" ? "processed" : "sent");
          }}
        />
        <div className={classes.grow} />
        <Typography variant="h6">{text}</Typography>
        <div className={classes.grow} />
        <NavBarButton
          edge="end"
          name="take-away"
          icon={<FastfoodIcon style={{ fontSize: "1.8rem" }} />}
          onClick={() =>
            createOrder(window.localStorage.getItem(C.USERTYPE_ID))
          }
        />
      </Toolbar>
    </AppBar>
  );
}
