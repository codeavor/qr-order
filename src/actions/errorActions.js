import { push } from "connected-react-router";
import C from "../constants";

export function setError(error) {
  return {
    type: C.SET_ERROR,
    error: error,
  };
}

export function resetError() {
  return {
    type: C.RESET_ERROR,
  };
}
export const handleError = (error) => {
  return function (dispatch) {
    dispatch(setError(error));
    dispatch(push("/"));
  };
};
