import React, { useEffect } from "react";

import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import CartArea from "../components/cart/CartArea";
import BottomBox from "../components/common/BottomBox";
import BottomButton from "../components/common/BottomButton";
import NavBar from "../components/common/NavBar";
import Loading from "../components/common/Loading";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import C from "../constants";

import {
  getCart,
  deleteOrderItem,
  changeQuantity,
} from "../actions/cartActions";
import { totalCartPrice } from "../utils/cart/cartUtils";

const EmptyCart = () => {
  return (
    <Grid
      container
      data-testid="empty-cart"
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Typography>Cart is empty!</Typography>
    </Grid>
  );
};

export function CartContainer({
  cartData,
  deleteOrderItem,
  changeQuantity,
  getCart,
}) {
  useEffect(() => {
    getCart(window.localStorage.getItem(C.ORDER_ID));
  }, [getCart]);

  return cartData.loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <NavBar text="My Cart" />
      {cartData.cart.length !== 0 ? (
        <Box py={5} mt={5}>
          <CartArea
            cart={cartData.cart}
            deleteOrderItem={deleteOrderItem}
            changeQuantity={changeQuantity}
          />
        </Box>
      ) : (
        <EmptyCart />
      )}
      <BottomBox>
        <BottomButton
          text={"Continue"}
          price={totalCartPrice(cartData.cart)}
          route={C.CHECKOUT_PATH}
          disabled={cartData.cart.length === 0}
        />
      </BottomBox>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (orderId) => dispatch(getCart(orderId)),
    deleteOrderItem: (orderItemId) => dispatch(deleteOrderItem(orderItemId)),
    changeQuantity: (quantity, orderItemId) =>
      dispatch(changeQuantity(quantity, orderItemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
