import axios from "axios";
import C from "../constants";

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

export const getMenuFailure = (error) => {
  return {
    type: C.GET_MENU_FAILURE,
    payload: error,
  };
};

export const getMenu = () => {
  return function (dispatch) {
    dispatch(getMenuRequest());
    axios
      .get(C.API_URL + C.MENU_ENDPOINT)
      .then((response) => {
        const menu = response.data;
        dispatch(getMenuSuccess(menu));
      })
      .catch((error) => {
        dispatch(getMenuFailure(error.response.data.error));
      });
  };
};
