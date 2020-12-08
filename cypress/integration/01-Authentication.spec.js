import { apiMock } from "../support/mocks/apiMock";
import C from "../../src/constants";

describe("Testing /authentication/:id", () => {
  beforeEach(() => {
    cy.server();
    cy.fixture("auth_mock_data.json").then((rc) => {
      apiMock(C.REGISTER_ENDPOINT, "POST", rc.register, "register");
    });
    cy.fixture("menu_mock_data.json").then((rc) => {
      apiMock(C.MENU_ENDPOINT, "GET", rc.getMenu, "getMenu");
    });
    cy.fixture("cart_mock_data.json").then((rc) => {
      apiMock(`${C.CART_ENDPOINT}/1`, "GET", rc.getCart, "getCart");
    });
  });

  it("Redirecting non authenticated users to /", () => {
    cy.visit(C.URL + C.MENU_PATH);
    cy.url().should("eq", `${C.URL}/`);
  });

  it("Authenticating and redirecting to umbrella", () => {
    cy.visit(`${C.URL + C.LOGIN_PATH}/1`);
    cy.findByTestId("loading").should("exist");
    cy.wait("@register");
    cy.wait("@getMenu");
    cy.wait("@getCart");
    cy.url().should("eq", C.URL + C.MENU_PATH);
  });

  it("Getting wrong token", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      apiMock(C.REGISTER_ENDPOINT, "POST", rc.wrongToken, "register");
    });

    cy.visit(`${C.URL + C.LOGIN_PATH}/1`);
    cy.wait("@register");

    cy.url().should("eq", `${C.URL}/`);
  });
});
