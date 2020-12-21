import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import CartItem from "./CartItem";

CartArea.propTypes = {
  cart: PropTypes.array,
};

CartArea.defaultProps = {
  cart: [],
};

export default function CartArea({ cart, deleteOrderItem, changeQuantity }) {
  return cart.length !== 0 ? (
    <Container data-testid="cart-area" style={{ marginBottom: "30px" }}>
      {cart.map((cartItem) => (
        <CartItem
          item_name={cartItem.item_name}
          notes={cartItem.notes}
          extras={cartItem.extras}
          quantity={cartItem.quantity}
          price={cartItem.price}
          id={cartItem.id}
          key={cartItem.id}
          deleteOrderItem={deleteOrderItem}
          changeQuantity={changeQuantity}
        />
      ))}
    </Container>
  ) : (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Typography>Cart is empty!</Typography>
    </Grid>
  );
}
