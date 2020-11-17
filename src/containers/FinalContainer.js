import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getCart
} from "../actions/cartActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import ThankContainer from "../components/ThankContainer";

export function CheckoutContainer({
  cartData,
  userData,
  getCart,
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
      <NavBar back={true} text="Transaction Completed !" />
      <ThankContainer></ThankContainer>
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
    getCart: (orderId) => dispatch(getCart(orderId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
