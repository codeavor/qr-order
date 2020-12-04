import React from "react";
import { ListItemAvatar, ListItemSecondaryAction } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import { totalItemPrice } from "../utils/cart/cartUtils";

CheckoutItem.propTypes = {
  name: PropTypes.string,
  extras: PropTypes.array,
  extraPrice: PropTypes.array,
  quantity: PropTypes.number,
  price: PropTypes.string,
  id: PropTypes.number,
};

CheckoutItem.defaultProps = {
  extras: [],
};

export default function CheckoutItem({
  name,
  extras,
  extraPrice,
  quantity,
  price,
}) {
  return (
    <ListItem data-testid="checkout-item" ContainerComponent="div">
      <ListItemAvatar>
        <Typography>{quantity}x</Typography>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={extras.join(", ")} />
      <ListItemSecondaryAction>
        <Typography>
          {totalItemPrice(price, extraPrice, quantity).toFixed(2)}€
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
