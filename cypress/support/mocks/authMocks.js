import { apiUrl } from "../../settings";

export const register = (response, status = 200) => {
  let endpoint = "/api/auth/register";

  cy.route({
    method: "POST",
    status: status,
    url: apiUrl + endpoint,
    response,
  }).as("register");
};
