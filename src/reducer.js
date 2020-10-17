import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import menuReducer from "./reducers/menuReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    menu: menuReducer,
  });
export default createRootReducer;
