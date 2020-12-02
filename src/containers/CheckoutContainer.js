import React, { useEffect } from "react";

import { connect } from "react-redux";

import { getCart, orderComplete } from "../actions/cartActions";
import BackToTopButton from "../components/BackToTopButton";
import Error from "../components/Error";
import Loading from "../components/Loading";
import CheckoutArea from "../components/CheckoutArea";
import NavBar from "../components/NavBar";
import CheckoutPayment from "../components/CheckoutPayment";
import { totalCartPrice } from "../utils/cart/cartUtils";
import BottomBox from "../components/BottomBox";
import C from "../constants";

export function CheckoutContainer({ cartData, getCart, orderComplete }) {
  useEffect(() => {
    getCart(window.localStorage.getItem(C.ORDER_ID));
  }, [getCart]);

  return cartData.loading ? (
    <Loading />
  ) : cartData.error ? (
    <Error error={cartData.error} />
  ) : (
    <div>
      <NavBar back={true} text="Checkout" />
      <CheckoutPayment />
      <CheckoutArea cart={cartData.cart} />
      <BottomBox
        text={"Checkout"}
        price={totalCartPrice(cartData.cart)}
        completeOrder={orderComplete}
        orderId={window.localStorage.getItem(C.ORDER_ID)}
        route={"/final"}
      />
      <BackToTopButton />
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
