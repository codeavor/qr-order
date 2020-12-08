import { apiMock } from "../support/mocks/apiMock";
import C from "../../src/constants";

describe("Testing /checkout", () => {
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
    apiMock(C.MENU_ENDPOINT, "GET", mockData.getMenu, "getMenu");
    apiMock(`${C.CART_ENDPOINT}/1`, "GET", mockData.getCart, "getCart");
  });

  it("Shows the checkout", () => {
    apiMock(
      `${C.CART_ENDPOINT}/1?order_complete=true`,
      "PUT",
      {},
      "completeOrder"
    );

    cy.visit(C.URL + C.CART_PATH);
    cy.wait("@getCart");

    cy.findByTestId("bottom-button").click();
    cy.wait("@getCart");
    cy.url().should("eq", C.URL + C.CHECKOUT_PATH);

    cy.findByTestId("payment-options").should("exist");
    cy.findAllByTestId("checkout-item").should("have.length", 2);
    cy.findByTestId("bottom-button").should("exist");
    cy.findByTestId("bottom-button").click();
    cy.wait("@completeOrder");
    cy.url().should("eq", C.URL + C.FINAL_PATH);
    cy.findByText("Thank you for your purchase!").should("exist");
  });
});
