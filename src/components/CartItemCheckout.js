import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

import { totalItemPrice } from "../utils/cart/cartUtils";

const useStyles = makeStyles((theme) => ({
  smallButton: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
  },
  grow: {
    flexGrow: 1,
  },
}));

CartItem.propTypes = {
  name: PropTypes.string,
  extras: PropTypes.array,
  extraPrice: PropTypes.array,
  quantity: PropTypes.number,
  price: PropTypes.string,
  id: PropTypes.number,
  deleteOrderItem: PropTypes.func,
  changeQuantity: PropTypes.func,
};

CartItem.defaultProps = {
  extras: [],
  deleteOrderItem: () => {},
  changeQuantity: () => {},
};

export default function CartItem({
  name,
  extras,
  extraPrice,
  quantity,
  price
}) {
  const classes = useStyles();

  return (
    <div style={{ maxWidth: "300px" }} data-testid="cart-item">
      <List>
        <ListItem>
          <ListItemText
            disableTypography
            primary={<Typography>{quantity}X {name}</Typography>}
            secondary={
              <>
                <Typography>{extras.join(", ")}</Typography>
                <Box
                  display="flex"
                  flexDirection="col"
                  flexWrap="nowrap"
                  alignItems="center"
                >
                  <Box>
                    <Box
                      display="inline"
                      px={2}
                      data-testid="cart-item-quantity">
                    </Box>
                  </Box>
                  <Typography className={classes.grow} />
                  <Typography>
                    {totalItemPrice(price, extraPrice, quantity).toFixed(2)}€
                    <Divider  display="flex" flexWrap="nowrap"/>
                  </Typography>
                </Box>
              </>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}
