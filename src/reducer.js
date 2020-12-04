import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import menuReducer from "./reducers/menuReducer";
import itemReducer from "./reducers/itemReducer";
import cartReducer from "./reducers/cartReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    menu: menuReducer,
    item: itemReducer,
    cart: cartReducer,
  });
export default createRootReducer;
