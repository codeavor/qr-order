import axios from "axios";
import { push } from "connected-react-router";
import C from "../constants";
import { removeToken } from "../utils/auth/removeToken";
import { fixCart } from "../utils/cart/cartUtils";
import { handleError } from "./errorActions";

export const getCartRequest = () => {
  return {
    type: C.GET_CART,
  };
};

export const getCartSuccess = (cart) => {
  return {
    type: C.GET_CART_SUCCESS,
    payload: cart,
  };
};

export const getCartError = () => {
  return {
    type: C.GET_CART_FAILURE,
  };
};

export const getCart = (orderId) => {
  return function (dispatch) {
    dispatch(getCartRequest());
    axios
      .get(`${C.API_URL + C.CART_ENDPOINT}/${orderId}`)
      .then((response) => {
        const cart = fixCart(response.data);
        dispatch(getCartSuccess(cart));
      })
      .catch((error) => {
        dispatch(getCartError());
        dispatch(handleError(error.response.data.error));
      });
  };
};

export const deleteOrderItem = (orderItemId) => {
  return function (dispatch) {
    axios
      .delete(`${C.API_URL + C.ORDER_ENDPOINT}/${orderItemId}`)
      .then((response) => {
        const cart = fixCart(response.data);
        dispatch(getCartSuccess(cart));
      })
      .catch((error) => {
        dispatch(getCartError());
        dispatch(handleError(error.response.data.error));
      });
  };
};

export const changeQuantity = (quantity, orderItemId) => {
  return function (dispatch) {
    axios
      .put(
        `${C.API_URL + C.ORDER_ENDPOINT}/${orderItemId}?quantity=${quantity}`
      )
      .then((response) => {
        const cart = fixCart(response.data);
        dispatch(getCartSuccess(cart));
      })
      .catch((error) => {
        dispatch(getCartError());
        dispatch(handleError(error.response.data.error));
      });
  };
};

export const orderComplete = (orderId, role) => {
  return function (dispatch) {
    axios
      .put(`${C.API_URL + C.CART_ENDPOINT}/${orderId}?order_complete=sent`)
      .then(() => {
        if (role === C.CUSTOMER_ROLE) removeToken();
        else dispatch(push(C.ORDERS_PATH));
      })
      .catch((error) => {
        dispatch(getCartError());
        dispatch(handleError(error.response.data.error));
      });
  };
};

export const addItemToCart = (orderId, itemId, quantity, extrasId, notes) => {
  const options = {
    url: C.API_URL + C.ORDER_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      order_id: orderId,
      item_id: itemId,
      quantity: quantity,
      extras_id: extrasId,
      notes: notes,
    },
  };

  return function (dispatch) {
    axios(options).catch((error) => {
      dispatch(getCartError());
      dispatch(handleError(error.response.data.error));
    });
  };
};
