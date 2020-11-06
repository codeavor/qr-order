import C from "../constants";

const initialState = {
  cart: [],
  loading: true,
  error: "",
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
        error: "",
      };
    case C.GET_CART_FAILURE:
      return {
        ...state,
        cart: [],
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
