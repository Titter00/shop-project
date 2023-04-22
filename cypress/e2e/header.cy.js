/// <reference types="cypress" />
import HeaderPage from "../support/page-object/headerPage";

describe("E2E - Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be visible", () => {
    HeaderPage.elements.container().should("be.visible");
  });

  it("should contain header elements", () => {
    HeaderPage.elements.container().within(() => {
      HeaderPage.elements.title().should("exist");
      HeaderPage.elements.icon().should("exist");
      HeaderPage.elements.input().should("exist");
    });
  });

  it("should return correct h1 values", () => {
    HeaderPage.elements
      .title()
      .should("have.length", 1)
      .find("span")
      .should("have.css", "color", "rgb(217, 4, 41)")
      .as("title");

    cy.get("@title").should("have.text", "Shop");
  });
});
