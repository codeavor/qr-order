import React, { useEffect } from "react";

import { connect } from "react-redux";

import { getCart } from "../actions/cartActions";
import { getMenu } from "../actions/menuActions";
import BottomBox from "../components/BottomBox";
import CategoriesBar from "../components/CategoriesBar";
import Loading from "../components/Loading";
import MenuArea from "../components/MenuArea";
import NavBar from "../components/NavBar";
import C from "../constants";
import { totalCartPrice } from "../utils/cart/cartUtils";

export function MenuContainer({ menuData, cartData, getMenu, getCart }) {
  useEffect(() => {
    getMenu();
    getCart(window.localStorage.getItem(C.ORDER_ID));
  }, [getMenu, getCart]);

  return menuData.loading || cartData.loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <NavBar back={false} text="Welcome" search={true} />
      <CategoriesBar menu={menuData.menu} />
      <MenuArea menu={menuData.menu} />
      <BottomBox
        text="Cart"
        price={"" + totalCartPrice(cartData.cart)}
        route={C.CART_PATH}
        quantity={false}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    menuData: state.menu,
    cartData: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenu: () => dispatch(getMenu()),
    getCart: (orderId) => dispatch(getCart(orderId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
