import React from "react";

import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

BottomButton.propTypes = {
  text: PropTypes.string,
  price: PropTypes.number,
  route: PropTypes.string,
};

BottomButton.defaultProps = {
  price: 0,
  route: "/",
};

export default function BottomButton({ text, price, route, ...props }) {
  return (
    <Button
      data-testid="bottom-button"
      variant="contained"
      disableFocusRipple={true}
      disableRipple={true}
      color="primary"
      startIcon={<ShoppingCartIcon data-testid="cart-icon" />}
      component={Link}
      to={route}
      {...props}
    >
      <span data-testid="bottom-button-text">{text}</span> &nbsp;
      <span data-testid="bottom-button-price">
        {price.toFixed(2).replace(".", ",")}€
      </span>
    </Button>
  );
}
