import C from "../constants";

const initialState = {
  item: null,
  extraValues: {},
  loading: true,
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
      };
    case C.GET_ITEM_FAILURE:
      return {
        ...state,
        item: null,
        loading: false,
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
