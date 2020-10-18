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
      .get("https://qr-order-api.herokuapp.com/api/menu")
      .then((response) => {
        const menu = response.data;
        dispatch(getMenuSuccess(menu));
      })
      .catch((error) => {
        // let err = null;
        // if (error.response) err = error.response.data.message;
        // else err = error.data.message;
        dispatch(getMenuFailure(error.response.data.message));
      });
  };
};
