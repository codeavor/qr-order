import axios from "axios";
import C from "../../constants";

export function isAuthenticated() {
  let token = window.localStorage.getItem(C.JWT_TOKEN);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    return false;
  }
}
