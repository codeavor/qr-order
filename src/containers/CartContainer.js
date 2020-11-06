import React, { useEffect } from "react";

import { connect } from "react-redux";

import {
  getCart,
  deleteOrderItem,
  changeQuantity,
} from "../actions/cartActions";
import BackToTopButton from "../components/BackToTopButton";
import BottomButton from "../components/BottomButton";
import Error from "../components/Error";
import Loading from "../components/Loading";
import CartArea from "../components/CartArea";
import NavBar from "../components/NavBar";
import { totalCartPrice } from "../utils/cart/cartUtils";

export function CartContainer({
  cartData,
  deleteOrderItem,
  changeQuantity,
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
      <NavBar back={true} text="My Cart" search={true} />
      <CartArea
        cart={cartData.cart}
        deleteOrderItem={deleteOrderItem}
        changeQuantity={changeQuantity}
      />
      <BottomButton
        icon={true}
        text={"Continue"}
        price={totalCartPrice(cartData.cart)}
        route={"/checkout"}
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
    deleteOrderItem: (orderItemId) => dispatch(deleteOrderItem(orderItemId)),
    changeQuantity: (quantity, orderItemId) =>
      dispatch(changeQuantity(quantity, orderItemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
