import { url } from "../settings";
import * as menuMocks from "../support/mocks/menuMocks";

describe("Testing /Umbrella", () => {
  beforeEach(() => {
    cy.server();
  });

  it("Shows the menu and categories correctly after loading", () => {
    cy.fixture("menu_mock_data.json").then((rc) => {
      menuMocks.getMenu(rc.getMenu);
    });
    cy.visit(url + "/umbrella");

    cy.findByTestId("loading").should("exist");
    cy.wait("@getMenu");
    cy.findByTestId("nav-bar").should("exist");
    cy.findByTestId("categories-bar").should("exist");
    cy.findByTestId("menu-area").should("exist");
    cy.findByTestId("bottom-button").should("exist");
  });

  it("Shows an error after loading", () => {
    cy.fixture("menu_mock_data.json").then((rc) => {
      menuMocks.getMenu(rc.getError, 404);
    });
    cy.visit(url + "/umbrella");

    cy.findByTestId("loading").should("exist");
    cy.wait("@getMenu");
    cy.findByTestId("error").should("exist");
    cy.findByTestId("nav-bar").should("not.exist");
    cy.findByTestId("categories-bar").should("not.exist");
    cy.findByTestId("menu-area").should("not.exist");
    cy.findByTestId("bottom-button").should("not.exist");
  });
});
