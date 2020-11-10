import axios from "axios";

export function isAuthenticated() {
  let token = window.localStorage.getItem("jwtToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    return false;
  }
}
