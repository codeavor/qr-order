import React from "react";

import { Route, Switch } from "react-router-dom";

import AuthenticationContainer from "./containers/AuthenticationContainer";
import ScanQRCodeContainer from "./containers/ScanQRCodeContainer";
import UmbrellaContainer from "./containers/UmbrellaContainer";
import ItemContainer from "./containers/ItemContainer";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ScanQRCodeContainer} />
      <Route path="/authentication/:id" component={AuthenticationContainer} />
      <ProtectedRoute path="/umbrella" component={UmbrellaContainer} />
      <ProtectedRoute path="/item/:id" component={ItemContainer} />
      {/* <Route path='/cart' component={cartContainer} /> */}
      {/* <Route path='/checkout' component={checkoutContainer} /> */}
      {/* <Route component={pageNotFoundContainer} /> */}
    </Switch>
  );
}

export default App;

// TODO: create a protected route
// If user is authenticated, redirect to /umbrella,
// if not, redirect to /
// You can access url variables with const { name } = useParams()
// Auth reducer and actions

// TODO: change umbrella to menu, everywhere
