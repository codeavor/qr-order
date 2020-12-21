import axios from "axios";
import C from "../constants";
import { setAuthorizationToken } from "../utils/auth/setAuthorizationToken";
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
    },
  };

  return function (dispatch) {
    axios(options)
      .then((response) => {
        if (id === "0") {
          const { token, orderId, role_name } = response.data;
          setAuthorizationToken(token, orderId, role_name);
          dispatch(push(C.MENU_PATH));
        } else {
          const { token, userTypeId, role_name } = response.data;
          setAuthorizationToken(token, userTypeId, role_name);
          dispatch(push(C.ORDERS_PATH));
        }
      })
      .catch((error) => {
        dispatch(handleError(error.response.data.error));
      });
  };
};
