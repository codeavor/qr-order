import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import menuReducer from "./reducers/menuReducer";
import itemReducer from "./reducers/itemReducer";
import cartReducer from "./reducers/cartReducer";
import errorReducer from "./reducers/errorReducer";
import ordersReducer from "./reducers/ordersReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    menu: menuReducer,
    item: itemReducer,
    cart: cartReducer,
    orders: ordersReducer,
  });
export default createRootReducer;
