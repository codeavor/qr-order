import axios from "axios";
import C from "../constants";
import setAuthorizationToken from "../utils/auth/setAuthorizationToken";
import { push } from "connected-react-router";
import { handleError } from "./errorActions";

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
    axios(options)
      .then((response) => {
        const { token, orderId } = response.data;
        setAuthorizationToken(token, orderId);
        dispatch(push(C.MENU_PATH));
      })
      .catch((error) => {
        dispatch(handleError(error.response.data.error));
      });
  };
};
