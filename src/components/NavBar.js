import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LoopIcon from "@material-ui/icons/Loop";
import PropTypes from "prop-types";
import { useHistory, withRouter } from "react-router";
import C from "../constants";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    margin: theme.spacing(1),
    minWidth: "50px",
  },
}));

NavBar.propTypes = {
  statusFilter: PropTypes.string,
  setStatusFilter: PropTypes.func,
  back: PropTypes.bool,
  text: PropTypes.string,
  page: PropTypes.string,
  createOrder: PropTypes.func,
  removeOrder: PropTypes.func,
};

export function NavBar({
  removeOrder,
  statusFilter,
  setStatusFilter,
  back,
  text,
  page,
  createOrder,
}) {
  const classes = useStyles();
  const history = useHistory();

  const backButton = () => {
    let orderId = window.localStorage.getItem(C.ORDER_ID);

    if (isTakeAwayMenu()) {
      removeOrder(orderId);
    }
    history.goBack();
  };

  const isTakeAwayMenu = () => {
    let role = window.localStorage.getItem(C.ROLE);
    return role === C.KITCHEN_ROLE && page === "menu";
  };

  const BarButton = ({ edge = "start", name, icon, ...props }) => {
    return (
      <IconButton
        edge={edge}
        className={classes.menuButton}
        aria-label={`${name}-button`}
        data-testid={`${name}-button`}
        {...props}
      >
        {icon}
      </IconButton>
    );
  };

  return (
    <div className={classes.grow}>
      <AppBar
        position={page === "menu" ? "static" : "fixed"}
        color="default"
        data-testid="nav-bar"
      >
        <Toolbar>
          {back ? (
            <BarButton
              name="back"
              icon={<KeyboardBackspaceIcon />}
              disabled={page === "menu" && !isTakeAwayMenu()}
              onClick={() => backButton()}
            />
          ) : page === "kitchen" ? (
            <BarButton
              name="status"
              icon={<LoopIcon style={{ fontSize: "1.8rem" }} />}
              onClick={() => {
                setStatusFilter(statusFilter === "sent" ? "processed" : "sent");
              }}
            />
          ) : (
            <BarButton disabled />
          )}
          <div className={classes.grow} />
          <Typography variant="h6">{text}</Typography>
          <div className={classes.grow} />
          {page === "kitchen" ? (
            <BarButton
              edge="end"
              name="take-away"
              icon={<FastfoodIcon style={{ fontSize: "1.8rem" }} />}
              onClick={() => createOrder()}
            />
          ) : (
            <BarButton edge="end" disabled />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(NavBar);
