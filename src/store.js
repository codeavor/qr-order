import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createRootReducer from "./reducer";

const thunkMiddleware = require("redux-thunk").default;

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const composeEnhancers = composeWithDevTools({ trace: true });
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware
      )
    )
  );

  return store;
}
