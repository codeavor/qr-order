import C from "../constants";

const initState = {
  error: null,
};

export function errorReducer(state = initState, action) {
  const { error } = action;

  if (error) {
    return {
      error: error,
    };
  } else if (action.type === C.RESET_ERROR) {
    return {
      error: null,
    };
  }

  return state;
}
