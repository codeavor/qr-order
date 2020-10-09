import React from "react";
import { Route, Switch } from "react-router-dom";
import ScanQRCodeContainer from "./containers/ScanQRCodeContainer";
import UmbrellaContainer from "./containers/UmbrellaContainer";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={ScanQRCodeContainer} />
        <Route path="/umbrella" component={UmbrellaContainer} />
        {/* <Route path="/item/:id" component={itemContainer} /> */}
        {/* <Route path='/cart' component={cartContainer} /> */}
        {/* <Route path='/checkout' component={checkoutContainer} /> */}
        {/* <Route component={pageNotFoundContainer} /> */}
      </Switch>
    </div>
  );
}

export default App;
