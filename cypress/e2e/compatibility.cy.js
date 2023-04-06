/// <reference types="cypress" />

describe("compatibility tests", () => {
  it("displays properly in Chrome, Firefox, and Edge", () => {
    const browsers = ["chromea", "firefox", "edge"];
    browsers.forEach((browser) => {
      cy.visit("/", {
        browser: browser,
        chromeWebSecurity: false,
      });
      cy.get("[data-cy='products']").should("be.visible");
    });
  });
});
