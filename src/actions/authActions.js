import axios from "axios";
import C from "../constants";
import setAuthorizationToken from "../utils/auth/setAuthorizationToken";

export const getTokenRequest = () => {
  return {
    type: C.GET_TOKEN,
  };
};

export const getTokenSuccess = (orderId) => {
  return {
    type: C.GET_TOKEN_SUCCESS,
    payload: orderId,
  };
};

export const getTokenFailure = (error) => {
  return {
    type: C.GET_TOKEN_FAILURE,
    payload: error,
  };
};

export const getToken = (id) => {
  const options = {
    url: C.API_URL + "/auth/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      umbrella_id: id,
      role_name: "customer",
    },
  };

  return function (dispatch) {
    dispatch(getTokenRequest());
    axios(options)
      .then((response) => {
        const { token, orderId } = response.data;
        setAuthorizationToken(token);
        dispatch(getTokenSuccess(orderId));
      })
      .catch((error) => {
        dispatch(getTokenFailure(JSON.stringify(error.response.data.error)));
      });
  };
};
