import { apiMock } from "../support/mocks/apiMock";
import C from "../../src/constants";

describe("Testing /cart", () => {
  let mockFiles = ["menu_mock_data.json", "cart_mock_data.json"];
  let mockData;

  before(() => {
    cy.register();
    for (let mockFile of mockFiles) {
      // eslint-disable-next-line no-loop-func
      cy.fixture(mockFile).then((rc) => {
        mockData = { ...mockData, ...rc };
      });
    }
  });

  beforeEach(() => {
    cy.server();
    cy.restoreLocalStorage();
  });

  it("Shows the cart", () => {
    apiMock(C.MENU_ENDPOINT, "GET", mockData.getMenu, "getMenu");
    apiMock(`${C.CART_ENDPOINT}/1`, "GET", mockData.getCart, "getCart");

    cy.visitMenuPage();

    cy.findByTestId("bottom-button").click();

    cy.wait("@getCart");
    cy.url().should("eq", C.URL + C.CART_PATH);

    cy.findByTestId("nav-bar").should("exist");
    cy.findByTestId("cart-area").should("exist");
    cy.findByTestId("bottom-button").should("exist");
  });

  it("Deletes an item and reduces quantity", () => {
    apiMock(
      `${C.ORDER_ENDPOINT}/57`,
      "DELETE",
      mockData.deleteOrderItem,
      "delete"
    );
    apiMock(
      `${C.ORDER_ENDPOINT}/58?quantity=2`,
      "PUT",
      mockData.changeQuantity,
      "changeQuantity"
    );

    // testing that delete works
    cy.findAllByTestId("cart-item").its("length").as("cartItemCount");

    cy.findAllByTestId("delete-item").first().click();
    cy.wait("@delete");

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
});
