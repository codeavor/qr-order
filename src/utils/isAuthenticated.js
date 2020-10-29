import jwt from "jwt-decode";
import axios from "axios";

export function isAuthenticated() {
  let token = window.localStorage.getItem("jwtToken");
  if (token) {
    let tokenExpiration = jwt(token).exp;
    let dateNow = new Date();
    let expired = tokenExpiration < dateNow.getTime() / 1000;
    if (!expired) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return !expired;
  }
  return false;
}
