import "@testing-library/cypress/add-commands";
import "cypress-localstorage-commands";
import C from "../../src/constants";

Cypress.Commands.add("visitMenuPage", () => {
  cy.visit(C.URL + C.MENU_PATH);
  cy.findByTestId("loading").should("exist");
  cy.wait("@getMenu");
  cy.wait("@getCart");
});

Cypress.Commands.add("visitKitchenPage", () => {
  cy.visit(C.URL + C.KITCHEN_PATH);
  cy.findByTestId("loading").should("exist");
  cy.wait("@getOrders");
});

Cypress.Commands.add("register", () => {
  cy.setLocalStorage(C.JWT_TOKEN, 12345);
  cy.setLocalStorage(C.ORDER_ID, 1);
  cy.setLocalStorage(C.ROLE, C.CUSTOMER_ROLE);
  cy.saveLocalStorage();
});

Cypress.Commands.add("registerKitchen", () => {
  cy.setLocalStorage(C.JWT_TOKEN, 12345);
  cy.setLocalStorage(C.USERTYPE_ID, 1);
  cy.setLocalStorage(C.ROLE, C.KITCHEN_ROLE);
  cy.saveLocalStorage();
});
