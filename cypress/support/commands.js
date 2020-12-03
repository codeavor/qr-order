import "@testing-library/cypress/add-commands";
import "cypress-localstorage-commands";
import C from "../../src/constants";

Cypress.Commands.add("visitMenuPage", () => {
  cy.visit(C.URL + C.MENU_PATH);
  cy.findByTestId("loading").should("exist");
  cy.wait("@getMenu");
  cy.wait("@getCart");
});

Cypress.Commands.add("register", () => {
  cy.setLocalStorage("jwtToken", 12345);
  cy.setLocalStorage("orderId", 1);
  cy.saveLocalStorage();
});
