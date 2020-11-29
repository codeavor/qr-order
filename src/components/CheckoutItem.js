import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

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
    <div style={{ maxWidth: "300px" }} data-testid="checkout-item">
      <List>
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {quantity}X {name}
              </Typography>
            }
            secondary={
              <>
                <Typography>{extras.join(", ")}</Typography>
                <Box
                  display="flex"
                  flexDirection="col"
                  wrap="nowrap"
                  alignItems="center"
                >
                  <Typography>
                    {totalItemPrice(price, extraPrice, quantity).toFixed(2)}€
                  </Typography>
                </Box>
              </>
            }
          />
        </ListItem>
        <Divider display="flex" wrap="nowrap" />
      </List>
    </div>
  );
}
