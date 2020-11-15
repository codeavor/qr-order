import C from "../constants";

const initialState = {
  item: [],
  extraValues: {},
  loading: true,
  error: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case C.GET_ITEM:
      return {
        ...state,
        loading: true,
      };
    case C.GET_ITEM_SUCCESS:
      return {
        ...state,
        item: payload,
        loading: false,
        error: "",
      };
    case C.GET_ITEM_FAILURE:
      return {
        ...state,
        item: null,
        loading: false,
        error: payload,
      };
    case C.SET_EXTRA_VALUES:
      return {
        ...state,
        extraValues: payload,
      };
    default:
      return state;
  }
};
