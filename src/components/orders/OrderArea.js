import React from "react";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import OrderCard from "./OrderCard";

OrderArea.propTypes = {
  orders: PropTypes.array,
  changeStatus: PropTypes.func,
  statusFilter: PropTypes.string,
};

OrderArea.defaultProps = {
  orders: [],
  changeStatus: () => {},
  statusFilter: "",
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
    width: "100%",
  },
  fullHeight: {
    height: "100vh !important",
    paddingRight: "0.5em !important",
    paddingLeft: "0.5em !important",
  },
}));

export default function OrderArea({ statusFilter, orders, changeStatus }) {
  const classes = useStyles();

  return (
    <div data-testid="order-area" className={classes.root}>
      <GridList className={classes.gridList}>
        {orders
          .filter((order) => order.order_complete === statusFilter)
          .map((order) => (
            <GridListTile
              key={order.cart[0].order_id}
              className={classes.fullHeight}
            >
              <OrderCard order={order} changeStatus={changeStatus} />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
