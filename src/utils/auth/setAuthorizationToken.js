import axios from "axios";
import C from "../../constants";
import { removeToken } from "./removeToken";

export default function setAutorizationToken(token, orderId) {
  if (token && orderId) {
    window.localStorage.setItem(C.JWT_TOKEN, token);
    window.localStorage.setItem(C.ORDER_ID, orderId);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    removeToken(token, orderId);
  }
}
