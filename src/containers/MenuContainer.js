import React, { useEffect } from "react";

import { connect } from "react-redux";

import { getCart } from "../actions/cartActions";
import { removeOrder } from "../actions/ordersActions";
import { getMenu } from "../actions/menuActions";
import BottomBox from "../components/common/BottomBox";
import Loading from "../components/common/Loading";
import NavBar from "../components/common/NavBar";
import CategoriesBar from "../components/menu/CategoriesBar";
import MenuArea from "../components/menu/MenuArea";
import C from "../constants";
import { totalCartPrice } from "../utils/cart/cartUtils";

export function MenuContainer({
  menuData,
  cartData,
  getMenu,
  getCart,
  removeOrder,
}) {
  useEffect(() => {
    getMenu();
    getCart(window.localStorage.getItem(C.ORDER_ID));
  }, [getMenu, getCart]);

  return menuData.loading || cartData.loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <NavBar
        back={true}
        removeOrder={removeOrder}
        text="Welcome"
        page="menu"
      />
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
    removeOrder: (orderId) => dispatch(removeOrder(orderId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
