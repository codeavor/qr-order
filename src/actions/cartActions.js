import axios from "axios";
import C from "../constants";
import { fixCart } from "../utils/cart/cartUtils";

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

export const getCartError = (error) => {
  return {
    type: C.GET_CART_FAILURE,
    payload: error,
  };
};

export const getCart = (orderId) => {
  return function (dispatch) {
    dispatch(getCartRequest());
    axios
      .get(C.API_URL + "/cart/" + orderId)
      .then((response) => {
        const cart = fixCart(response.data);
        dispatch(getCartSuccess(cart));
      })
      .catch((error) => {
        dispatch(getCartError(error.response.data.error));
      });
  };
};

export const deleteOrderItem = (orderItemId) => {
  return function (dispatch) {
    axios
      .delete(C.API_URL + "/order_item/" + orderItemId)
      .then((response) => {
        const cart = fixCart(response.data);
        dispatch(getCartSuccess(cart));
      })
      .catch((error) => {
        dispatch(getCartError(error.response.data.error));
      });
  };
};

export const changeQuantity = (quantity, orderItemId) => {
  return function (dispatch) {
    axios
      .put(C.API_URL + "/order_item/" + orderItemId + "?quantity=" + quantity)
      .then((response) => {
        const cart = fixCart(response.data);
        dispatch(getCartSuccess(cart));
      })
      .catch((error) => {
        dispatch(getCartError(error.response.data.error));
      });
  };
};

export const addItemToCart = (orderId, itemId, quantity, extrasId) => {
  const options = {
    url: C.API_URL + "/order_item",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      order_id: orderId,
      item_id: itemId,
      quantity: quantity,
      extras_id: extrasId,
    },
  };

  return function (dispatch) {
    axios(options).catch((error) => {
      dispatch(getCartError(error.response.data.error));
    });
  };
};
