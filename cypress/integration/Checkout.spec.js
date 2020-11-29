import { url } from "../settings";
import * as authMocks from "../support/mocks/authMocks";
import * as cartMocks from "../support/mocks/cartMocks";
import * as menuMocks from "../support/mocks/menuMocks";
import * as checkoutMock from "../support/mocks/checkoutMock";
import "cypress-localstorage-commands";

describe("Testing /cart", () => {
  before(() => {
    cy.setLocalStorage("jwtToken", 102323);
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.server();
    cy.restoreLocalStorage();
  });

  it("Shows the checkout", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.register(rc.register);
    });
    cy.fixture("menu_mock_data.json").then((rc) => {
      menuMocks.getMenu(rc.getMenu);
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.cart("/api/cart/1", "GET", rc.getCart);
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      checkoutMock.completeOrder("/api/cart/1?order_complete=true", "PUT", {});
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@register");
    cy.wait("@getMenu");
    cy.wait("@cart");

    cy.url().should("eq", url + "/umbrella");
    cy.findByTestId("bottom-button").click();

    cy.wait("@cart");
    cy.url().should("eq", url + "/cart");

    cy.findByTestId("bottom-button").click();
    cy.wait("@cart");
    cy.url().should("eq", url + "/checkout");

    cy.findByTestId("payment-options").should("exist");
    cy.findAllByTestId("checkout-item").should("have.length", 2);
    cy.findByTestId("bottom-button").should("exist");
    cy.findByTestId("bottom-button").click();
    cy.wait("@completeOrder");
    cy.url().should("eq", url + "/final");
    cy.findByText("Thank you for your purchase").should("exist");
  });

  it("Shows an error after loading", () => {
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

    cy.findByTestId("bottom-button").click();
    cy.wait("@cart");

    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.cart("/api/cart/1", "GET", rc.getError, 401);
    });

    cy.findByTestId("bottom-button").click();
    cy.wait("@cart");
    cy.findByTestId("error").should("exist");
    cy.findByTestId("nav-bar").should("not.exist");
    cy.findByTestId("bottom-button").should("not.exist");
  });
});
