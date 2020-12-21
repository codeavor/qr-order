import axios from "axios";
import C from "../../constants";

export function removeToken() {
  window.localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
}
