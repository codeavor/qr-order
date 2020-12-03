import C from "../../src/constants";

describe("Testing / (ScanQRCode page)", () => {
  it("Shows the scan qr code message", () => {
    cy.visit(`${C.URL}/`);
    cy.findByText("Scan QR Code").should("exist");
  });
});
