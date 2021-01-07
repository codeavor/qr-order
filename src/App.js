import React from "react";

import { Route, Switch } from "react-router-dom";

import AuthenticationContainer from "./containers/AuthenticationContainer";
import ScanQRCodeContainer from "./containers/ScanQRCodeContainer";
import MenuContainer from "./containers/MenuContainer";
import ItemContainer from "./containers/ItemContainer";
import CartContainer from "./containers/CartContainer";
import CheckoutContainer from "./containers/CheckoutContainer";
import FinalContainer from "./containers/FinalContainer";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import KitchenContainer from "./containers/KitchenContainer";
import C from "./constants";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ScanQRCodeContainer} />
      <Route path={`${C.LOGIN_PATH}/:id`} component={AuthenticationContainer} />
      <ProtectedRoute path={C.MENU_PATH} component={MenuContainer} />
      <ProtectedRoute path={`${C.ITEM_PATH}/:id`} component={ItemContainer} />
      <ProtectedRoute path={C.CART_PATH} component={CartContainer} />
      <ProtectedRoute path={C.CHECKOUT_PATH} component={CheckoutContainer} />
      <ProtectedRoute path={C.KITCHEN_PATH} component={KitchenContainer} />
      <ProtectedRoute path={C.FINAL_PATH} component={FinalContainer} />
    </Switch>
  );
}

export default App;
