import { apiUrl } from "../../settings";

export const completeOrder = (endpoint, method, response, status = 200) => {
  cy.route({
    method: method,
    status: status,
    url: apiUrl + endpoint,
    response,
  }).as("completeOrder");
};
