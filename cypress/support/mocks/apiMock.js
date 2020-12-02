import { apiUrl } from "../../settings";

export const api = (endpoint, method, response, status = 200) => {
  cy.route({
    method: method,
    status: status,
    url: apiUrl + endpoint,
    response
  });
};
