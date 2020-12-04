import C from "../constants";

const initialState = {
  menu: [],
  loading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case C.GET_MENU:
      return {
        ...state,
        loading: true,
      };
    case C.GET_MENU_SUCCESS:
      return {
        ...state,
        menu: payload,
        loading: false,
      };
    case C.GET_MENU_FAILURE:
      return {
        ...state,
        menu: [],
        loading: false,
      };
    default:
      return state;
  }
};
