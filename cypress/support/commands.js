import "@testing-library/cypress/add-commands";
import "cypress-localstorage-commands";

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "https://qr-order-api.herokuapp.com/api/auth/register",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      umbrella_id: 1,
      role_name: "customer",
    },
  })
    .its("body")
    .then((body) => {
      cy.log(body);
      cy.setLocalStorage("jwtToken", body.token);
    });
});
