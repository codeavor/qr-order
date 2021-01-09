import React from "react";

import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import CartItem from "./CartItem";

CartArea.propTypes = {
  cart: PropTypes.array,
  deleteOrderItem: PropTypes.func,
  changeQuantity: PropTypes.func,
};

CartArea.defaultProps = {
  cart: [],
  deleteOrderItem: () => {},
  changeQuantity: () => {},
};

export default function CartArea({ cart, deleteOrderItem, changeQuantity }) {
  return (
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
  );
}
