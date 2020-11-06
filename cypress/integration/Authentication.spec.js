import { url } from "../settings";
import * as authMocks from "../support/mocks/authMocks";
import * as cartMocks from "../support/mocks/cartMocks";
import * as menuMocks from "../support/mocks/menuMocks";

describe("Testing /authentication/:id", () => {
  beforeEach(() => {
    cy.server();
  });

  it("Redirecting non authenticated users to /", () => {
    cy.visit(url + "/umbrella");
    cy.url().should("eq", url + "/");
  });

  it("Authenticating and redirecting to umbrella", () => {
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
  });

  it("Server returns wrong token, user get redirected to /", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.register(rc.wrongToken);
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@register");
    cy.url().should("eq", url + "/");
  });

  it("Server returns error", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.register(rc.getError, 401);
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@register");
    cy.findByTestId("error").should("exist");
  });
});
