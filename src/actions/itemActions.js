import axios from "axios";
import C from "../constants";

export const getItemRequest = () => {
  return {
    type: C.GET_ITEM,
  };
};

export const getItemSuccess = (item) => {
  return {
    type: C.GET_ITEM_SUCCESS,
    payload: item,
  };
};

export const getItemFailure = (error) => {
  return {
    type: C.GET_ITEM_FAILURE,
    payload: error,
  };
};

export const getItem = (id) => {
  return function (dispatch) {
    dispatch(getItemRequest());
    axios
      .get("https://qr-order-api.herokuapp.com/api/menu/" + id)
      .then((response) => {
        const item = response.data;
        dispatch(getItemSuccess(item));
      })
      .catch((error) => {
        dispatch(getItemFailure(error.response.data.error));
      });
  };
};
