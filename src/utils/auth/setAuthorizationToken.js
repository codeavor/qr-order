import axios from "axios";
import C from "../../constants";

export default function setAutorizationToken(token, id, role) {
  window.localStorage.setItem(C.JWT_TOKEN, token);
  window.localStorage.setItem(C.ROLE, role);
  role === C.CUSTOMER_ROLE ? setOrderId(id) : setUserTypeId(id);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function setOrderId(orderId) {
  window.localStorage.setItem(C.ORDER_ID, orderId);
}

export function setUserTypeId(userTypeId) {
  window.localStorage.setItem(C.ORDER_ID, userTypeId);
}
