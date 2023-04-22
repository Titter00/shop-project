/// <reference types="cypress" />
import ProductPage from "../support/page-object/productPage";

describe("compatibility tests", () => {
  it("displays properly in Chrome, Firefox, and Edge", () => {
    const browsers = ["chromea", "firefox", "edge"];
    browsers.forEach((browser) => {
      cy.visit("/", {
        browser: browser,
        chromeWebSecurity: false,
      });
      ProductPage.elements.products().should("be.visible");
    });
  });
});
