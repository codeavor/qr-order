import { apiMock } from "../support/mocks/apiMock";
import C from "../../src/constants";

describe("Testing /menu", () => {
  before(() => {
    cy.register();
  });

  beforeEach(() => {
    cy.server();
    cy.restoreLocalStorage();
    cy.fixture("menu_mock_data.json").then((rc) => {
      apiMock(C.MENU_ENDPOINT, "GET", rc.getMenu, "getMenu");
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      apiMock(`${C.CART_ENDPOINT}/1`, "GET", rc.getCart, "getCart");
    });
  });

  it("Shows the menu and categories correctly after loading", () => {
    cy.visitMenuPage();

    cy.findByTestId("nav-bar").should("exist");
    cy.findByTestId("categories-bar").should("exist");
    cy.findByTestId("menu-area").should("exist");
    cy.findByTestId("bottom-button").should("exist");
  });
});
