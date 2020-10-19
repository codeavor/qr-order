import { routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";

import createRootReducer from "./reducer";

const thunkMiddleware = require("redux-thunk").default;

export const history = createHashHistory({
  basename: process.env.PUBLIC_URL,
});

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware
      )
    )
  );

  return store;
}
