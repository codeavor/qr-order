import { url } from "../settings";
import * as authMocks from "../support/mocks/authMocks";
import * as cartMocks from "../support/mocks/cartMocks";
import * as menuMocks from "../support/mocks/menuMocks";

describe("Testing /cart", () => {
  beforeEach(() => {
    cy.server();
  });

  it("Shows the cart", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.register(rc.register);
    });
    cy.fixture("menu_mock_data.json").then((rc) => {
      menuMocks.getMenu(rc.getMenu);
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.getCart(rc.getCart);
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@register");
    cy.wait("@getMenu");
    cy.wait("@getCart");

    cy.url().should("eq", url + "/umbrella");
    cy.findByTestId("bottom-button").click();

    cy.wait("@getCart");
    cy.url().should("eq", url + "/cart");

    cy.findByTestId("nav-bar").should("exist");
    cy.findByTestId("cart-area").should("exist");
    cy.findByTestId("bottom-button").should("exist");
  });

  it("Deletes an item and reduces quantity", () => {
    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.changeQuantity(rc.changeQuantity);
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.deleteOrderItem(rc.deleteOrderItem);
    });

    // testing that delete works
    cy.findAllByTestId("cart-item").its("length").as("cartItemCount");

    cy.findAllByTestId("delete-item").first().click();
    cy.wait("@deleteOrderItem");

    cy.get("@cartItemCount").then((cartItemCount) => {
      cy.findByTestId("cart-item").should("have.length", cartItemCount - 1);
    });

    // testing that changing quantity works
    cy.findByTestId("cart-item-quantity").invoke("text").as("cartItemQuantity");

    cy.findByTestId("decrease-quantity").click();
    cy.wait("@changeQuantity");

    cy.get("@cartItemQuantity").then((cartItemQuantity) => {
      cy.findByTestId("cart-item-quantity").should(
        "have.text",
        cartItemQuantity - 1
      );
    });
  });

  it("Shows an error after loading", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.register(rc.register);
    });
    cy.fixture("menu_mock_data.json").then((rc) => {
      menuMocks.getMenu(rc.getMenu);
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.getCart(rc.getCart);
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@register");
    cy.wait("@getMenu");
    cy.wait("@getCart");

    cy.url().should("eq", url + "/umbrella");

    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.getCart(rc.getError, 401);
    });

    cy.findByTestId("bottom-button").click();

    cy.wait("@getCart");
    cy.findByTestId("error").should("exist");
    cy.findByTestId("nav-bar").should("not.exist");
    cy.findByTestId("cart-area").should("not.exist");
    cy.findByTestId("bottom-button").should("not.exist");
  });
});
