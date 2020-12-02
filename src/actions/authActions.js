import axios from "axios";
import C from "../constants";
import setAuthorizationToken from "../utils/auth/setAuthorizationToken";

export const getTokenRequest = () => {
  return {
    type: C.GET_TOKEN,
  };
};

export const getTokenSuccess = () => {
  return {
    type: C.GET_TOKEN_SUCCESS,
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
    url: C.API_URL + C.REGISTER_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      umbrella_id: id,
      role_name: C.CUSTOMER_ROLE,
    },
  };

  return function (dispatch) {
    dispatch(getTokenRequest());
    axios(options)
      .then((response) => {
        const { token, orderId } = response.data;
        setAuthorizationToken(token, orderId);
        dispatch(getTokenSuccess());
      })
      .catch((error) => {
        dispatch(getTokenFailure(JSON.stringify(error.response.data.error)));
      });
  };
};
