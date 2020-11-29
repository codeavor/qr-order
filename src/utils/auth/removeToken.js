import axios from "axios";

export function removeToken() {
  window.localStorage.removeItem("jwtToken");
  delete axios.defaults.headers.common["Authorization"];
 
}
