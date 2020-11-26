import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";
import itemReducer from "./reducers/itemReducer";
import cartReducer from "./reducers/cartReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: authReducer,
    menu: menuReducer,
    item: itemReducer,
    cart: cartReducer,
  });
export default createRootReducer;
