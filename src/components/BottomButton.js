import React from "react";

import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

BottomButton.propTypes = {
  icon: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  route: PropTypes.string,
};

BottomButton.defaultProps = {
  price: 0,
  route: "/",
};

export default function BottomButton({ text, price, route }) {
  return (
    <Button
      data-testid="bottom-button"
      variant="contained"
      color="primary"
      startIcon={<ShoppingCartIcon data-testid="cart-icon" />}
      component={Link}
      to={route}
    >
      {text} {price.toFixed(2)}€
    </Button>
  );
}
