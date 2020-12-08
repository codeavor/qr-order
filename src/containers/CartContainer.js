import React, { useEffect } from "react";

import { connect } from "react-redux";

import {
  getCart,
  deleteOrderItem,
  changeQuantity,
} from "../actions/cartActions";
import BackToTopButton from "../components/BackToTopButton";
import Loading from "../components/Loading";
import CartArea from "../components/CartArea";
import NavBar from "../components/NavBar";
import { totalCartPrice } from "../utils/cart/cartUtils";
import BottomBox from "../components/BottomBox";
import C from "../constants";
import { Box } from "@material-ui/core";

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
      <NavBar back={true} text="My Cart" />
      <Box py={5} mt={5}>
        <CartArea
          cart={cartData.cart}
          deleteOrderItem={deleteOrderItem}
          changeQuantity={changeQuantity}
        />
      </Box>
      <BottomBox
        disable={totalCartPrice(cartData.cart) === 0}
        text={"Continue"}
        price={"" + totalCartPrice(cartData.cart)}
        route={C.CHECKOUT_PATH}
      />
      <BackToTopButton />
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
