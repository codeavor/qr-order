import { createStore } from "redux";
import productReducer from "./product/productReducers";

const store = createStore(productReducer);

export default store;
