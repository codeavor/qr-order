import C from "../constants";

const initialState = {
  loading: false,
  menu: [],
  error: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case C.FETCH_MENU_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case C.FETCH_MENU_SUCCESS:
      return {
        loading: false,
        menu: payload,
        error: "",
      };
    case C.FETCH_MENU_FAILURE:
      return {
        loading: false,
        menu: [],
        error: payload,
      };
    default:
      return state;
  }
};
