import axios from "axios";
import { push } from "connected-react-router";
import { handleError, resetError } from "./errorActions";
import C from "../constants";
import { setOrderId } from "../utils/auth/setAuthorizationToken";

export const getOrdersRequest = () => {
  return {
    type: C.GET_ORDERS,
  };
};

export const getOrdersSuccess = (orders) => {
  return {
    type: C.GET_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const getOrdersFailure = () => {
  return {
    type: C.GET_ORDERS_FAILURE,
  };
};

export const getOrders = () => {
  return function (dispatch) {
    dispatch(getOrdersRequest());
    axios
      .get(C.API_URL + C.ORDERS_ENDPOINT)
      .then((response) => {
        const orders = response.data;
        dispatch(resetError());
        dispatch(getOrdersSuccess(orders));
      })
      .catch((error) => {
        dispatch(getOrdersFailure());
        dispatch(handleError(error.response.data.error));
      });
  };
};

export const createOrder = (userId) => {
  const options = {
    url: C.API_URL + C.ORDERS_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      user_id: userId,
    },
  };

  return function (dispatch) {
    axios(options)
      .then((response) => {
        setOrderId(response.data.order_id);
        dispatch(resetError());
        dispatch(push(C.MENU_PATH));
      })
      .catch((error) => {
        dispatch(getOrdersFailure());
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
        if (status === "sent") dispatch(push(C.KITCHEN_PATH));
        else dispatch(getOrdersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getOrdersFailure());
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
        dispatch(push(C.KITCHEN_PATH));
      })
      .catch((error) => {
        dispatch(getOrdersFailure());
        dispatch(handleError(error.response.data.error));
      });
  };
};
