import axios from "axios";
import C from "../constants";

export const fetchMenuRequest = () => {
  return {
    type: C.FETCH_MENU,
  };
};

export const fetchMenuSuccess = (users) => {
  return {
    type: C.FETCH_MENU_SUCCESS,
    payload: users,
  };
};

export const fetchMenuFailure = (error) => {
  return {
    type: C.FETCH_MENU_FAILURE,
    payload: error,
  };
};

export const fetchMenu = () => {
  return function (dispatch) {
    dispatch(fetchMenuRequest());
    axios
      .get("https://qr-order-api.herokuapp.com/api/menu")
      .then((response) => {
        const menu = response.data;
        dispatch(fetchMenuSuccess(menu));
      })
      .catch((error) => {
        dispatch(fetchMenuFailure(error));
      });
  };
};
