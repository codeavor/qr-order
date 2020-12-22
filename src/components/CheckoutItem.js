import React from "react";
import { ListItemAvatar, ListItemSecondaryAction } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import { showExtras, totalItemPrice } from "../utils/cart/cartUtils";

CheckoutItem.propTypes = {
  item_name: PropTypes.string,
  notes: PropTypes.string,
  extras: PropTypes.array,
  quantity: PropTypes.number,
  price: PropTypes.string,
};

CheckoutItem.defaultProps = {
  extras: [],
};

export default function CheckoutItem({
  item_name,
  notes,
  extras,
  quantity,
  price,
}) {
  return (
    <ListItem data-testid="checkout-item" ContainerComponent="div">
      <ListItemAvatar>
        <Typography>{quantity}x</Typography>
      </ListItemAvatar>
      <ListItemText primary={item_name} secondary={showExtras(extras, notes)} />
      <ListItemSecondaryAction>
        <Typography>
          {totalItemPrice(price, extras, quantity).toFixed(2).replace(".", ",")}
          €
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
