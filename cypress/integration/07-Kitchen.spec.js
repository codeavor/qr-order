import { apiMock } from "../support/mocks/apiMock";
import C from "../../src/constants";

describe("Testing /orders", () => {
  let mockFiles = [
    "kitchen_mock_data.json",
    "menu_mock_data.json",
    "cart_mock_data.json",
  ];
  let mockData;

  before(() => {
    cy.registerKitchen();
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
    apiMock(C.ORDERS_ENDPOINT, "GET", mockData.getOrders, "getOrders");
  });

  it("Shows all the orders", () => {
    cy.visitKitchenPage();

    cy.findByTestId("nav-bar").should("exist");
    cy.findByTestId("order-area").should("exist");
  });

  // take-away

  it("Filter orders by status", () => {
    cy.findAllByTestId("order-card").its("length").as("orderCardCount");
    cy.get("@orderCardCount").then(() => {
      cy.findAllByTestId("order-card").should("have.length", 2);
    });

    cy.findAllByTestId("status-button").first().click();

    cy.get("@orderCardCount").then(() => {
      cy.findByTestId("order-card").should("have.length", 1);
    });
  });

  it("Change order's status", () => {
    apiMock(
      `${C.ORDERS_ENDPOINT}/2?order_complete=completed`,
      "PUT",
      mockData.changeStatus,
      "changeStatus"
    );
    cy.findAllByTestId("order-card").its("length").as("orderCardCount");

    cy.findAllByTestId("change-order-status").first().click();
    cy.wait("@changeStatus");

    cy.get("@orderCardCount").then((orderCardCount) => {
      cy.findByTestId("order-card").should("have.length", orderCardCount - 1);
    });
  });

  it("Goes to take-away and back to orders", () => {
    apiMock(
      `${C.ORDERS_ENDPOINT}`,
      "POST",
      mockData.createOrder,
      "createOrder"
    );
    apiMock(`${C.ORDERS_ENDPOINT}/1`, "DELETE", {}, "deleteOrder");
    apiMock(C.MENU_ENDPOINT, "GET", mockData.getMenu, "getMenu");
    apiMock(`${C.CART_ENDPOINT}/1`, "GET", mockData.getCart, "getCart");
    cy.findAllByTestId("take-away-button").first().click();
    cy.wait("@createOrder");
    cy.visitMenuPage();

    cy.findAllByTestId("back-button").first().click();
    cy.wait("@deleteOrder");
    cy.wait("@getOrders");
    cy.url().should("eq", C.URL + C.ORDERS_PATH);
  });

  it("Complete an order as kitchen, redirect back to orders when complete", () => {
    apiMock(
      `${C.ORDERS_ENDPOINT}/1?order_complete=sent`,
      "PUT",
      {},
      "changeStatus"
    );
    apiMock(
      `${C.ORDERS_ENDPOINT}`,
      "POST",
      mockData.createOrder,
      "createOrder"
    );
    apiMock(C.MENU_ENDPOINT, "GET", mockData.getMenu, "getMenu");
    apiMock(`${C.CART_ENDPOINT}/1`, "GET", mockData.getCart, "getCart");

    // Go to take-away-menu
    cy.findAllByTestId("take-away-button").first().click();
    cy.wait("@createOrder");

    // Go to checkout
    cy.visit(C.URL + C.CHECKOUT_PATH);
    cy.wait("@getCart");

    // Complete your order
    cy.findByTestId("bottom-button").click();
    cy.wait("@changeStatus");
    cy.url().should("eq", C.URL + C.ORDERS_PATH);
  });
});
