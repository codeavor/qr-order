import { url } from "../settings";
import * as authMocks from "../support/mocks/authMocks";
import * as cartMocks from "../support/mocks/cartMocks";
import * as menuMocks from "../support/mocks/menuMocks";
import * as itemMocks from "../support/mocks/itemMocks";
import "cypress-localstorage-commands";

describe("Testing /item", () => {
  before(() => {
    cy.setLocalStorage("jwtToken", 102323);
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.server();
    cy.restoreLocalStorage();
  });

  it("Shows the item", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.register(rc.register);
    });
    cy.fixture("menu_mock_data.json").then((rc) => {
      menuMocks.getMenu(rc.getMenu);
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.cart("/api/cart/1", "GET", rc.emptyCart);
    });
    cy.fixture("item_mock_data.json").then((rc) => {
      itemMocks.item("/api/menu/1", "GET", rc.getItem);
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@register");
    cy.wait("@getMenu");
    cy.wait("@cart");

    cy.url().should("eq", url + "/umbrella");
    cy.findAllByTestId("menu-item").first().click();
    cy.wait("@item");

    cy.url().should("eq", url + "/item/1");

    cy.findByTestId("nav-bar").should("exist");
    cy.findByTestId("item-area").should("exist");
    cy.findByTestId("bottom-button").should("exist");
    cy.findByTestId("quantity-button-group").should("exist");
  });

  // quantity changes, disables, select things, add to cart,
  it("Changes quantity", () => {
    // Check initial value equals 1
    cy.findByTestId("quantity-value-button").should("have.text", "1");
    // Check that quantity can't be less than 1
    cy.findByTestId("minus-quantity-button").click();
    cy.findByTestId("quantity-value-button").should("have.text", "1");
    // Check if quantity increases by 1
    cy.findByTestId("plus-quantity-button").click();
    cy.findByTestId("quantity-value-button").should("have.text", "2");
    // Check if quantity decreases by 1
    cy.findByTestId("minus-quantity-button").click();
    cy.findByTestId("quantity-value-button").should("have.text", "1");
  });

  it("Check if we can select anything and disables/enables", () => {
    // Check if item price is correct
    cy.findByTestId("bottom-button-price").should("have.text", "1.00");

    // Check if disabled
    cy.findByText("Επιλέξτε είδος ζάχαρης")
      .closest("label")
      .should("have.class", "Mui-disabled");

    // Check if clicking tha radio enables checkbox
    cy.get("input[value='0 2'][type='radio']").click();
    cy.get("input[value='0 2'][type='radio']")
      .parent()
      .parent()
      .should("have.class", "Mui-checked");

    cy.findByText("Επιλέξτε είδος ζάχαρης")
      .closest("label")
      .should("not.have.class", "Mui-disabled");

    cy.get("input[value='0 4'][type='checkBox']").click();

    // Check if sugar's getting disabled
    cy.get("input[value='0 1'][type='radio']").click();
    cy.findByText("Επιλέξτε είδος ζάχαρης")
      .closest("label")
      .should("have.class", "Mui-disabled");

    // Check if checkbox is clicked and changes price
    cy.get("input[value='20 10'][type='checkbox']").click();
    cy.get("input[value='20 10'][type='checkbox']")
      .parent()
      .parent()
      .should("have.class", "Mui-checked");

    cy.findByTestId("bottom-button-price").should("have.text", "1.20");
  });

  it("Add item to cart", () => {
    // Add item with selected extras
    cy.fixture("item_mock_data.json").then(() => {
      itemMocks.orderItem("/api/order_item", "POST");
    });
    cy.fixture("menu_mock_data.json").then((rc) => {
      menuMocks.getMenu(rc.getMenu);
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.cart("/api/cart/1", "GET", rc.cartWithOrderItem);
    });

    cy.findByTestId("bottom-button").click();
    cy.wait("@orderItem");
    cy.wait("@getMenu");
    cy.wait("@cart");

    cy.url().should("eq", url + "/umbrella");
    cy.findByTestId("bottom-button-price").should("have.text", "1.20");
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

    cy.fixture("cart_mock_data.json").then((rc) => {
      cartMocks.cart("/api/cart/1", "GET", rc.getError, 401);
    });

    cy.findByTestId("bottom-button").click();

    cy.wait("@cart");
    cy.findByTestId("error").should("exist");
    cy.findByTestId("nav-bar").should("not.exist");
    cy.findByTestId("cart-area").should("not.exist");
    cy.findByTestId("bottom-button").should("not.exist");
  });
});
