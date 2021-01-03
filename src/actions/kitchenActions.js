import axios from "axios";
import C from "../constants";
import { handleError, resetError } from "../actions/errorActions";
import { setOrderId } from "../utils/auth/setAuthorizationToken";
import { push } from "connected-react-router";

export const getKitchenRequest = () => {
  return {
    type: C.GET_KITCHEN,
  };
};

export const getKitchenSuccess = (kitchen) => {
  return {
    type: C.GET_KITCHEN_SUCCESS,
    payload: kitchen,
  };
};

export const getKitchenFailure = () => {
  return {
    type: C.GET_KITCHEN_FAILURE,
  };
};

export const getOrders = () => {
  return function (dispatch) {
    dispatch(getKitchenRequest());
    axios
      .get(C.API_URL + C.ORDERS_ENDPOINT)
      .then((response) => {
        const orders = response.data;
        dispatch(resetError());
        dispatch(getKitchenSuccess(orders));
      })
      .catch((error) => {
        dispatch(getKitchenFailure());
        dispatch(handleError(error.response.data.error));
      });
  };
};

export const createOrder = () => {
  const options = {
    url: C.API_URL + C.ORDERS_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      user_id: window.localStorage.getItem(C.USERTYPE_ID),
    },
  };

  return function (dispatch) {
    dispatch(getKitchenRequest());
    axios(options)
      .then((response) => {
        setOrderId(response.data.order_id);
        dispatch(resetError());
        dispatch(push(C.MENU_PATH));
      })
      .catch((error) => {
        dispatch(getKitchenFailure());
        dispatch(handleError(error.response.data.error));
      });
  };
};

export const changeStatus = (orderId, status = "sent") => {
  return function (dispatch) {
    axios
      .put(
        `${C.API_URL + C.ORDERS_ENDPOINT}/${orderId}?order_complete=${status}`
      )
      .then((response) => {
        if (status === "sent") dispatch(push(C.ORDERS_PATH));
        else dispatch(getKitchenSuccess(response.data));
      })
      .catch((error) => {
        dispatch(handleError(error.response.data.error));
      });
  };
};

export const removeOrder = (orderId) => {
  return function (dispatch) {
    axios
      .delete(`${C.API_URL + C.ORDERS_ENDPOINT}/${orderId}`)
      .then(() => {
        window.localStorage.removeItem(C.ORDER_ID);
      })
      .catch((error) => {
        dispatch(handleError(error.response.data.error));
      });
  };
};
