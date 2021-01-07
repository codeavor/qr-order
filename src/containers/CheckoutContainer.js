import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import { connect } from "react-redux";

import { getCart, orderComplete } from "../actions/cartActions";
import { changeStatus } from "../actions/kitchenActions";
import CheckoutArea from "../components/checkout/CheckoutArea";
import BottomBox from "../components/common/BottomBox";
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
  useEffect(() => {
    getCart(window.localStorage.getItem(C.ORDER_ID));
  }, [getCart]);

  return cartData.loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <NavBar back={true} text="Checkout" />
      <Box py={5} my={5}>
        <CheckoutArea cart={cartData.cart} />
      </Box>
      <BottomBox
        text={"Checkout"}
        price={"" + totalCartPrice(cartData.cart)}
        completeOrder={
          window.localStorage.getItem(C.ROLE) === C.CUSTOMER_ROLE
            ? orderComplete
            : changeStatus
        }
        orderId={window.localStorage.getItem(C.ORDER_ID)}
        route={C.FINAL_PATH}
      />
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
