import axios from "axios";

export function removeToken() {
  window.localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
}
