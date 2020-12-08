import { push } from "connected-react-router";
import C from "../constants";
import { removeToken } from "../utils/auth/removeToken";

export function setError(error) {
  return {
    type: C.SET_ERROR,
    payload: error,
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
    removeToken();
  };
};
