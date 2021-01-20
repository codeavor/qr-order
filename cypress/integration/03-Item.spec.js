import { apiMock } from "../support/mocks/apiMock";
import C from "../../src/constants";

describe("Testing /item", () => {
  let mockFiles = [
    "menu_mock_data.json",
    "cart_mock_data.json",
    "item_mock_data.json",
  ];
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
  });

  it("Shows the item", () => {
    apiMock(`${C.CART_ENDPOINT}/1`, "GET", mockData.getEmptyCart, "getCart");
    apiMock(`${C.MENU_ENDPOINT}/1`, "GET", mockData.getItem, "getItem");

    cy.visitMenuPage();

    cy.findAllByTestId("menu-item").first().click();
    cy.wait("@getItem");

    cy.url().should("eq", `${C.URL + C.ITEM_PATH}/1`);

    cy.findByTestId("nav-bar").should("exist");
    cy.findByTestId("item-area").should("exist");
    cy.findByTestId("bottom-button").should("exist");
    cy.findByTestId("quantity-button-group").should("exist");
  });

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
    cy.findByTestId("bottom-button-price").should("have.text", "1,00€");

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

    cy.get("input[id='0 4'][type='checkBox']").click();

    // Check if sugar's getting disabled
    cy.get("input[value='0 1'][type='radio']").click();
    cy.findByText("Επιλέξτε είδος ζάχαρης")
      .closest("label")
      .should("have.class", "Mui-disabled");

    // Check if checkbox is clicked and changes price
    cy.get("input[id='20 10'][type='checkbox']").click();
    cy.get("input[id='20 10'][type='checkbox']")
      .parent()
      .parent()
      .should("have.class", "Mui-checked");

    cy.findByTestId("bottom-button-price").should("have.text", "1,20€");
  });

  it("Add item to cart", () => {
    apiMock(C.ORDER_ITEM_ENDPOINT, "POST", {}, "addItem");
    apiMock(
      `${C.CART_ENDPOINT}/1`,
      "GET",
      mockData.cartWithOrderItem,
      "getCart"
    );

    cy.findByTestId("bottom-button").click();
    cy.wait("@addItem");
    cy.wait("@getMenu");
    cy.wait("@getCart");

    cy.url().should("eq", C.URL + C.MENU_PATH);
    cy.findByTestId("bottom-button-price").should("have.text", "1,20€");
  });
});
