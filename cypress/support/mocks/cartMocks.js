import { apiUrl } from "../../settings";

export const cart = (endpoint, method, response, status = 200) => {
  cy.route({
    method: method,
    status: status,
    url: apiUrl + endpoint,
    response,
  }).as("cart");
};
