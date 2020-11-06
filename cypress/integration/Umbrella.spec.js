import { url } from "../settings";
import * as authMocks from "../support/mocks/authMocks";
import * as cartMocks from "../support/mocks/cartMocks";
import * as menuMocks from "../support/mocks/menuMocks";

describe("Testing /umbrella", () => {
  beforeEach(() => {
    cy.server();
  });

  it("Shows the menu and categories correctly after loading", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.register(rc.register);
    });
    cy.fixture("menu_mock_data.json").then((rc) => {
      menuMocks.getMenu(rc.getMenu);
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.cart("/api/cart/1", "GET", rc.getCart);
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@register");
    cy.wait("@getMenu");
    cy.wait("@cart");

    cy.url().should("eq", url + "/umbrella");

    cy.findByTestId("nav-bar").should("exist");
    cy.findByTestId("categories-bar").should("exist");
    cy.findByTestId("menu-area").should("exist");
    cy.findByTestId("bottom-button").should("exist");
  });

  it("Shows an error after loading", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.register(rc.register);
    });
    cy.fixture("menu_mock_data.json").then((rc) => {
      menuMocks.getMenu(rc.getError, 401);
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.cart("/api/cart/1", "GET", rc.getCart);
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@register");
    cy.wait("@getMenu");
    cy.wait("@cart");

    cy.url().should("eq", url + "/umbrella");

    cy.findByTestId("error").should("exist");
    cy.findByTestId("nav-bar").should("not.exist");
    cy.findByTestId("categories-bar").should("not.exist");
    cy.findByTestId("menu-area").should("not.exist");
    cy.findByTestId("bottom-button").should("not.exist");
  });
});
