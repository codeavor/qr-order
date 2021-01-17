import axios from "axios";
import { handleError } from "./errorActions";
import C from "../constants";
import { removeToken } from "../utils/auth/removeToken";
import { fixCart } from "../utils/cart/cartUtils";
import { getExtrasId } from "../utils/extra/extraUtils";

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
      .delete(`${C.API_URL + C.ORDER_ITEM_ENDPOINT}/${orderItemId}`)
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
        `${
          C.API_URL + C.ORDER_ITEM_ENDPOINT
        }/${orderItemId}?quantity=${quantity}`
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

export const orderComplete = (orderId) => {
  return function (dispatch) {
    axios
      .put(`${C.API_URL + C.CART_ENDPOINT}/${orderId}?order_complete=sent`)
      .then(() => {
        removeToken();
      })
      .catch((error) => {
        dispatch(getCartError());
        dispatch(handleError(error.response.data.error));
      });
  };
};

export const addItemToCart = (itemId, quantity, values, notes) => {
  const options = {
    url: C.API_URL + C.ORDER_ITEM_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      order_id: window.localStorage.getItem(C.ORDER_ID),
      item_id: itemId,
      quantity: quantity,
      extras_id: getExtrasId(values),
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
