import React from "react";

import { GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import OrderCard from "../components/OrderCard";

OrderArea.propTypes = {
  orders: PropTypes.array,
};

OrderArea.defaultProps = {
  orders: [],
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  fullHeight: {
    height: "100vh !important",
    paddingRight: "0.5em !important",
    paddingLeft: "0.5em !important",
  },
}));

export default function OrderArea({ orders, changeStatus }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList}>
        {orders.map((order) => (
          <GridListTile className={classes.fullHeight}>
            <OrderCard order={order} changeStatus={changeStatus} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
