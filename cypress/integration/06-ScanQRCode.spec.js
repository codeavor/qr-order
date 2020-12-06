import { apiMock } from "../support/mocks/apiMock";
import C from "../../src/constants";

describe("Testing / (ScanQRCode page)", () => {
  beforeEach(() => {
    cy.server();
  });

  it("Shows the scan qr code message", () => {
    cy.visit(`${C.URL}/`);
    cy.findByText("Scan QR Code!").should("exist");
  });

  it("Shows the error message", () => {
    cy.fixture("auth_mock_data.json").then((rc) => {
      apiMock(C.REGISTER_ENDPOINT, "POST", rc.getError, "register", 400);
    });

    cy.visit(`${C.URL + C.LOGIN_PATH}/1`);
    cy.wait("@register");

    cy.url().should("eq", `${C.URL}/`);
    cy.findByTestId("error").should("exist");
    cy.findByTestId("close-error-button").click();
    cy.findByTestId("error").should("not.exist");
  });
});
