import React from "react";

import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PropTypes from "prop-types";

BottomButton.propTypes = {
  icon: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
};

export default function BottomButton({ icon, text, price }) {
  return (
    <Button
      data-testid="bottom-button"
      variant="contained"
      color="primary"
      startIcon={icon ? <ShoppingCartIcon data-testid="cart-icon" /> : null}
    >
      {text} {price}€
    </Button>
  );
}
