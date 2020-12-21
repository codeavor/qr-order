import axios from "axios";
import C from "../../constants";
import { removeToken } from "./removeToken";

export function isAuthenticated() {
  let token = window.localStorage.getItem(C.JWT_TOKEN);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
  } else {
    removeToken();
    return false;
  }
}
