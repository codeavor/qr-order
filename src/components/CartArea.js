import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: "30px",
  },
  emptyCart: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

CartArea.propTypes = {
  cart: PropTypes.array,
};

CartArea.defaultProps = {
  cart: [],
};

export default function CartArea({ cart, deleteOrderItem, changeQuantity }) {
  const classes = useStyles();

  return (
    <Container data-testid="cart-area" className={classes.section}>
      {cart.length !== 0 ? (
        cart.map((cartItem) => (
          <CartItem
            name={cartItem.name}
            extras={cartItem.extras}
            extraPrice={cartItem.extra_price}
            quantity={cartItem.quantity}
            price={cartItem.price}
            id={cartItem.order_item_id}
            key={cartItem.order_item_id}
            deleteOrderItem={deleteOrderItem}
            changeQuantity={changeQuantity}
          />
        ))
      ) : (
        <Typography className={classes.emptyCart}>Cart is empty!</Typography>
      )}
    </Container>
  );
}
