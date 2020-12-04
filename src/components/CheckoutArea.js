import React from "react";

import { List, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import CheckoutItem from "./CheckoutItem";

const useStyles = makeStyles((theme) => ({
  box: {
    margin: "2% auto",
    width: "80%",
    border: "0.8px solid rgb(188,188,188)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: "100%",
    alignItems: "flex-start",
  },
}));

CheckoutArea.propTypes = {
  cart: PropTypes.array,
};

CheckoutArea.defaultProps = {
  cart: [],
};

export default function CheckoutArea({ cart }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography>Order Resume</Typography>
      <Box px={2} className={classes.box} data-testid="checkout-area">
        <List className={classes.item}>
          {cart.map((cartItem) => (
            <CheckoutItem
              name={cartItem.name}
              extras={cartItem.extras}
              extraPrice={cartItem.extra_price}
              quantity={cartItem.quantity}
              price={cartItem.price}
              id={cartItem.order_item_id}
              key={cartItem.order_item_id}
            />
          ))}
        </List>
      </Box>
    </React.Fragment>
  );
}
