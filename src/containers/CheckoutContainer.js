import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import { connect } from "react-redux";

import { getCart, orderComplete } from "../actions/cartActions";
import { changeStatus } from "../actions/ordersActions";
import CheckoutArea from "../components/checkout/CheckoutArea";
import BottomBox from "../components/common/BottomBox";
import BottomButton from "../components/common/BottomButton";
import Loading from "../components/common/Loading";
import NavBar from "../components/common/NavBar";
import C from "../constants";
import { totalCartPrice } from "../utils/cart/cartUtils";

export function CheckoutContainer({
  cartData,
  getCart,
  orderComplete,
  changeStatus,
}) {
  const isCustomer = window.localStorage.getItem(C.ROLE) === C.CUSTOMER_ROLE;
  const orderId = window.localStorage.getItem(C.ORDER_ID);
  useEffect(() => {
    getCart(orderId);
  }, [getCart, orderId]);

  return cartData.loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <NavBar text="Checkout" />
      <Box py={5} my={5}>
        <CheckoutArea cart={cartData.cart} />
      </Box>
      <BottomBox>
        <BottomButton
          text={"Checkout"}
          price={totalCartPrice(cartData.cart)}
          route={C.FINAL_PATH}
          onClick={() =>
            isCustomer ? orderComplete(orderId) : changeStatus(orderId)
          }
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
    orderComplete: (orderId) => dispatch(orderComplete(orderId)),
    changeStatus: (orderId, status) => dispatch(changeStatus(orderId, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
