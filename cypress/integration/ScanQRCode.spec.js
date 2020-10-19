import { url } from "../settings";

describe("Testing /", () => {
  it("Shows the scan qr code message", () => {
    cy.visit(url + "/");
    cy.findByText("Scan QR Code").should("exist");
  });
});
