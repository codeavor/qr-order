import axios from "axios";
import C from "../constants";
import { removeToken } from "../utils/auth/removeToken";
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

export const orderComplete = (orderId) => {
  return function (dispatch) {
    axios
      .put(C.API_URL + "/cart/" + orderId + "?order_complete=" + true)
      .then(() => {
        removeToken();
      })
      .catch((error) => {
        dispatch(getCartError(error.response.data.error));
      });
  };
};

// export const addItemToCart = (quantity, orderItemId) => {
//   const options = {
//     url: "https://qr-order-api.herokuapp.com/api/order_item/" + orderItemId,
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     params: {
//       quantity: quantity,
//     },
//   };

//   return function (dispatch) {
//     axios(options)
//       .then((response) => {
//         const cart = response.data;
//         dispatch(getCartSuccess(cart));
//       })
//       .catch((error) => {
//         dispatch(getCartError(error.response.data.error));
//       });
//   };
// };
