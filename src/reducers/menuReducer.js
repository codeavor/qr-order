import C from "../constants";

const initialState = {
  menu: [],
  loading: true,
  error: "",
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
        error: "",
      };
    case C.GET_MENU_FAILURE:
      return {
        ...state,
        menu: [],
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
