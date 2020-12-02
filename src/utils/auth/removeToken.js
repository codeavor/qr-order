import axios from "axios";
import C from "../../constants";

export function removeToken() {
  window.localStorage.removeItem(C.JWT_TOKEN);
  window.localStorage.removeItem(C.ORDER_ID);
  delete axios.defaults.headers.common["Authorization"];
}
