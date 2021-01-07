import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import { showExtras, totalItemPrice } from "../../utils/cart/cartUtils";

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
  item_name: PropTypes.string,
  notes: PropTypes.string,
  extras: PropTypes.array,
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
  item_name,
  notes,
  extras,
  quantity,
  price,
  id,
  deleteOrderItem,
  changeQuantity,
}) {
  const classes = useStyles();
  const CartQuantityButton = ({ symbol, ...props }) => {
    return (
      <Button
        size="small"
        disableFocusRipple={true}
        disableRipple={true}
        variant="outlined"
        className={classes.smallButton}
        {...props}
      >
        <Typography>{symbol}</Typography>
      </Button>
    );
  };

  return (
    <List data-testid="cart-item">
      <ListItem>
        <ListItemText
          disableTypography
          primary={<Typography>{item_name}</Typography>}
          secondary={
            <React.Fragment>
              <Typography variant="body2" color="textSecondary">
                {showExtras(extras, notes)}
              </Typography>
              <Box
                display="flex"
                flexDirection="col"
                flexWrap="nowrap"
                alignItems="center"
              >
                <Box>
                  <CartQuantityButton
                    data-testid="increase-quantity"
                    symbol="+"
                    onClick={() => changeQuantity(quantity + 1, id)}
                  />
                  <Box display="inline" px={2} data-testid="cart-item-quantity">
                    <Typography display="inline">{quantity}</Typography>
                  </Box>
                  <CartQuantityButton
                    data-testid="decrease-quantity"
                    symbol="-"
                    onClick={() => changeQuantity(quantity - 1, id)}
                  />
                  <IconButton
                    data-testid="delete-item"
                    aria-label="delete"
                    disableFocusRipple={true}
                    disableRipple={true}
                    onClick={() => deleteOrderItem(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography className={classes.grow} />
                <Typography>
                  {totalItemPrice(price, extras, quantity)
                    .toFixed(2)
                    .replace(".", ",")}
                  €
                </Typography>
              </Box>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
    </List>
  );
}
