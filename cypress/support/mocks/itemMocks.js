import { apiUrl } from "../../settings";

export const item = (endpoint, method, response, status = 200) => {
  cy.route({
    method: method,
    status: status,
    url: apiUrl + endpoint,
    response,
  }).as("item");
};

export const orderItem = (endpoint, method, status = 200) => {
  cy.route({
    method: method,
    status: status,
    url: apiUrl + endpoint,
    response: {},
  }).as("orderItem");
};
