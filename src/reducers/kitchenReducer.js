import C from "../constants";

const initialState = {
  orders: [],
  loading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case C.GET_KITCHEN:
      return {
        ...state,
        loading: true,
      };
    case C.GET_KITCHEN_SUCCESS:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case C.GET_KITCHEN_FAILURE:
      return {
        ...state,
        orders: [],
        loading: false,
      };
    default:
      return state;
  }
};
