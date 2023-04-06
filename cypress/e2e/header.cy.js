/// <reference types="cypress" />

describe("E2E - Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be visible", () => {
    cy.get("[data-cy='header-container']").should("be.visible");
  });

  it("should contain header elements", () => {
    cy.get("[data-cy='header-container']").within(() => {
      cy.get("[data-cy='header-title']").should("exist");
      cy.get("[data-cy='header-icon']").should("exist");
      cy.get("[data-cy='header-input']").should("exist");
    });
  });

  it("should return correct h1 values", () => {
    cy.get("[data-cy='header-title']")
      .should("have.length", 1)
      .find("span")
      .should("have.css", "color", "rgb(217, 4, 41)")
      .as("title");

    cy.get("@title").should("have.text", "Shop");
  });
});
