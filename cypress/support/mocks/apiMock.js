import C from "../../../src/constants";

export const apiMock = (endpoint, method, response, name, status = 200) => {
  cy.route({
    method: method,
    status: status,
    url: C.API_URL + endpoint,
    response,
  }).as(name);
};
