import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CartItemCheckout from "./CartItemCheckout";
import Box from "@material-ui/core/Box";

const defaultProps = {
    border : 2,
    borderColor:'grey.600',
    marginTop:"3%",
    justifyContent:"center",
    display:"flex",
    flexWrap:"nowrap",
    style: { width: '80%', height: '70%' }
  };

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: "30px",
  },
}));

CartArea.propTypes = {
  cart: PropTypes.array,
};

CartArea.defaultProps = {
  cart: [],
};

export default function CartArea({cart}) {
  const classes = useStyles();

  return (
    <Box
    justifyContent="center"
    alignItems="center"
    display="flex"
    flexWrap="nowrap">
    <Box borderRadius={20} {...defaultProps}>
    <div data-testid="cart-area">
        <Container className={classes.section}>
            {cart.map((cartItem) => (
            <CartItemCheckout
                name={cartItem.name}
                extras={cartItem.extras}
                extraPrice={cartItem.extra_price}
                quantity={cartItem.quantity}
                price={cartItem.price}
                id={cartItem.order_item_id}
                key={cartItem.order_item_id}
            />
            ))}
        </Container>
     </div>
     </Box>    
    </Box> 
  );
}
