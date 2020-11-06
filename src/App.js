import React from "react";

import { Route, Switch } from "react-router-dom";

import AuthenticationContainer from "./containers/AuthenticationContainer";
import ScanQRCodeContainer from "./containers/ScanQRCodeContainer";
import UmbrellaContainer from "./containers/UmbrellaContainer";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import CartContainer from "./containers/CartContainer";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ScanQRCodeContainer} />
      <Route path="/authentication/:id" component={AuthenticationContainer} />
      <ProtectedRoute path="/umbrella" component={UmbrellaContainer} />
      {/* <Route path="/item/:id" component={itemContainer} /> */}
      <ProtectedRoute path="/cart" component={CartContainer} />
      {/* <Route path='/checkout' component={checkoutContainer} /> */}
      {/* <Route component={pageNotFoundContainer} /> */}
    </Switch>
  );
}

export default App;

// TODO: change umbrella to menu, everywhere
