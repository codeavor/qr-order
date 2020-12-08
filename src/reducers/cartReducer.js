import C from "../constants";

const initialState = {
  cart: [],
  loading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case C.GET_CART:
      return {
        ...state,
        loading: true,
      };
    case C.GET_CART_SUCCESS:
      return {
        ...state,
        cart: payload,
        loading: false,
      };
    case C.GET_CART_FAILURE:
      return {
        ...state,
        cart: [],
        loading: false,
      };
    default:
      return state;
  }
};
