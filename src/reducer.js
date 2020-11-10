import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";
import itemReducer from "./reducers/itemReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: authReducer,
    menu: menuReducer,
    item: itemReducer,
  });
export default createRootReducer;
