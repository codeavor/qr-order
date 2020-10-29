import C from "../constants";

const initialState = {
  orderId: null,
  loading: true,
  error: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case C.GET_TOKEN:
      return {
        ...state,
        loading: true,
      };
    case C.GET_TOKEN_SUCCESS:
      return {
        ...state,
        orderId: payload,
        loading: false,
        error: "",
      };
    case C.GET_TOKEN_FAILURE:
      return {
        ...state,
        orderId: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
