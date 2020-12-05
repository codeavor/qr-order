import axios from "axios";
import C from "../constants";
import { handleError, resetError } from "../actions/errorActions";

export const getMenuRequest = () => {
  return {
    type: C.GET_MENU,
  };
};

export const getMenuSuccess = (menu) => {
  return {
    type: C.GET_MENU_SUCCESS,
    payload: menu,
  };
};

export const getMenuFailure = () => {
  return {
    type: C.GET_MENU_FAILURE,
  };
};

export const getMenu = () => {
  return function (dispatch) {
    dispatch(getMenuRequest());
    axios
      .get(C.API_URL + C.MENU_ENDPOINT)
      .then((response) => {
        const menu = response.data;
        dispatch(resetError());
        dispatch(getMenuSuccess(menu));
      })
      .catch((error) => {
        dispatch(getMenuFailure());
        dispatch(handleError(error.response.data.error));
      });
  };
};
