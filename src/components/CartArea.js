import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import CartItem from "./CartItem";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: "30px",
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
    <div data-testid="cart-area">
      <Container className={classes.section}>
        {cart.map((cartItem, index) => (
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
        ))}
      </Container>
    </div>
  );
}
