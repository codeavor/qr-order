import { url } from "../settings";
import * as authMocks from "../support/mocks/authMocks";

describe("Testing /authentication/:id", () => {
  beforeEach(() => {
    cy.server();
  });

  it("Redirecting non authenticated users to /", () => {
    cy.visit(url + "/umbrella");
    cy.url().should("eq", url + "/");
  });

  it("Authenticating and redirecting to umbrella", () => {
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");

    cy.url().should("eq", url + "/umbrella");
    cy.findByTestId("categories-bar").should("exist");
  });

  it("Server returns wrong token, user get redirected to /", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.wrongToken(rc.wrongToken);
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@wrongToken");
    cy.url().should("eq", url + "/");
  });

  it("Server returns error", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      authMocks.wrongToken(rc.getError, 401);
    });
    cy.visit(url + "/authentication/1");
    cy.findByTestId("loading").should("exist");
    cy.wait("@wrongToken");
    cy.findByTestId("error").should("exist");
    cy.findByTestId("categories-bar").should("not.exist");
  });
});
