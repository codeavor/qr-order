import React from "react";
import { BUY_PRODUCT } from "./productTypes";

const initialState = {
  products: 10,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_PRODUCT:
      return {
        ...state,
        products: state.products - 1,
      };
    default:
      return state;
  }
};

export default productReducer;
