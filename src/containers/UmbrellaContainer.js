import React, { useEffect } from "react";

import { connect } from "react-redux";

import { getCart } from "../actions/cartActions";
import { getMenu } from "../actions/menuActions";
import BottomBox from "../components/BottomBox";
import CategoriesBar from "../components/CategoriesBar";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MenuArea from "../components/MenuArea";
import NavBar from "../components/NavBar";
import { totalCartPrice } from "../utils/cart/cartUtils";

export function UmbrellaContainer({
  menuData,
  cartData,
  userData,
  getMenu,
  getCart,
}) {
  useEffect(() => {
    getMenu();
    getCart(userData.orderId);
  }, [getMenu, getCart, userData]);

  return menuData.loading || cartData.loading ? (
    <Loading />
  ) : menuData.error || cartData.error ? (
    <Error error={menuData.error ? menuData.error : cartData.error} />
  ) : (
    <div>
      <NavBar back={false} text="Welcome" search={true} />
      <CategoriesBar menu={menuData.menu} />
      <MenuArea menu={menuData.menu} />
      <BottomBox
        text="Cart"
        price={"" + totalCartPrice(cartData.cart)}
        route={"/cart"}
        quantity={false}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menuData: state.menu,
    cartData: state.cart,
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenu: () => dispatch(getMenu()),
    getCart: (orderId) => dispatch(getCart(orderId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UmbrellaContainer);
