import React, { useEffect } from "react";

import { connect } from "react-redux";

import {
  getCart,
  orderComplete,
} from "../actions/cartActions";
import BackToTopButton from "../components/BackToTopButton";
import BottomButton from "../components/BottomButton";
import Error from "../components/Error";
import Loading from "../components/Loading";
import CartAreaCheckout from "../components/CartAreaCheckout";
import NavBar from "../components/NavBar";
import CheckoutPayment from "../components/CheckoutPayment";
import { totalCartPrice } from "../utils/cart/cartUtils";

export function CheckoutContainer({
  cartData,
  userData,
  getCart,
  orderComplete
}) {
  useEffect(() => {
    getCart(userData.orderId);
  }, [getCart, userData]);

  return cartData.loading ? (
    <Loading />
  ) : cartData.error ? (
    <Error error={cartData.error} />
  ) : (
    <div>
      <NavBar back={true} text="Checkout" />
      <CheckoutPayment/>
      <CartAreaCheckout
        cart={cartData.cart}
      />
      <BottomButton
        icon={false}
        text={"Checkout"}
        price={totalCartPrice(cartData.cart)}
        onClick={() => orderComplete(userData.orderId)}
        route={"/final"}
        
      />
      <BackToTopButton />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart,
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (orderId) => dispatch(getCart(orderId)),
    orderComplete : (orderId) => dispatch(orderComplete(orderId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
