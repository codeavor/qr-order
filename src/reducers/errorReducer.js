import C from "../constants";

const initialState = {
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case C.SET_ERROR:
      return {
        error: payload,
      };
    case C.RESET_ERROR:
      return {
        error: null,
      };
    default:
      return state;
  }
};
