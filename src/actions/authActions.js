import axios from "axios";
import { push } from "connected-react-router";
import { handleError } from "./errorActions";
import C from "../constants";
import setAuthorizationToken from "../utils/auth/setAuthorizationToken";

const isKitchen = (id) => {
  return id === "0";
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
    },
  };

  return function (dispatch) {
    axios(options)
      .then((response) => {
        let redirectPath = isKitchen(id) ? C.KITCHEN_PATH : C.MENU_PATH;
        if (isKitchen(id)) {
          const { token, userTypeId, role_name } = response.data;
          setAuthorizationToken(token, userTypeId, role_name);
        } else {
          const { token, orderId, role_name } = response.data;
          setAuthorizationToken(token, orderId, role_name);
        }
        dispatch(push(redirectPath));
      })
      .catch((error) => dispatch(handleError(error.response.data.error)));
  };
};
