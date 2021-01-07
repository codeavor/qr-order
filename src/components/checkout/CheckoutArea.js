import React from "react";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import CheckoutItem from "./CheckoutItem";

const useStyles = makeStyles((theme) => ({
  box: {
    margin: "1% auto",
    width: "90%",
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
    <Box px={2} className={classes.box} data-testid="checkout-area">
      <List className={classes.item}>
        {cart.map((cartItem) => (
          <React.Fragment>
            <CheckoutItem
              item_name={cartItem.item_name}
              notes={cartItem.notes}
              extras={cartItem.extras}
              quantity={cartItem.quantity}
              price={cartItem.price}
              key={cartItem.id}
            />
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
