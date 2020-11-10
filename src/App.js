import React from "react";

import { Route, Switch } from "react-router-dom";

import AuthenticationContainer from "./containers/AuthenticationContainer";
import ScanQRCodeContainer from "./containers/ScanQRCodeContainer";
import UmbrellaContainer from "./containers/UmbrellaContainer";
import ItemContainer from "./containers/ItemContainer";
import CartContainer from "./containers/CartContainer";
import ProtectedRoute from "./utils/auth/ProtectedRoute";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ScanQRCodeContainer} />
      <Route path="/authentication/:id" component={AuthenticationContainer} />
      <ProtectedRoute path="/umbrella" component={UmbrellaContainer} />
      <ProtectedRoute path="/item/:id" component={ItemContainer} />
      <ProtectedRoute path="/cart" component={CartContainer} />
      {/* <Route path='/checkout' component={checkoutContainer} /> */}
      {/* <Route component={pageNotFoundContainer} /> */}
    </Switch>
  );
}

export default App;

// TODO: change umbrella to menu, everywhere
