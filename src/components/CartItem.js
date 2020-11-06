import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

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
  price,
  id,
  deleteOrderItem,
  changeQuantity,
}) {
  const classes = useStyles();
  const QuantityButton = ({ symbol, ...props }) => {
    return (
      <Button
        size="small"
        variant="outlined"
        className={classes.smallButton}
        {...props}
      >
        {symbol}
      </Button>
    );
  };

  return (
    <div style={{ maxWidth: "300px" }} data-testid="cart-item">
      <List>
        <ListItem>
          <ListItemText
            disableTypography
            primary={<Typography>{name}</Typography>}
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
                    <QuantityButton
                      data-testid="increase-quantity"
                      symbol="+"
                      onClick={() => changeQuantity(quantity + 1, id)}
                    />
                    <Box
                      display="inline"
                      px={2}
                      data-testid="cart-item-quantity"
                    >
                      {quantity}
                    </Box>
                    <QuantityButton
                      data-testid="decrease-quantity"
                      symbol="-"
                      onClick={() => changeQuantity(quantity - 1, id)}
                    />
                    <IconButton
                      data-testid="delete-item"
                      aria-label="delete"
                      onClick={() => deleteOrderItem(id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography className={classes.grow} />
                  <Typography>
                    {totalItemPrice(price, extraPrice, quantity).toFixed(2)}€
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
