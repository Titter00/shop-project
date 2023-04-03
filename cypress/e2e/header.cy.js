/// <reference types="cypress" />

describe("E2E - Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be visible", () => {
    cy.get(".header__container").should("be.visible");
  });

  it("should contain header elements", () => {
    cy.get(".header__container").within(() => {
      cy.get(".header__title").should("exist");
      cy.get(".header__search").should("exist");
      cy.get(".header__icons").should("exist");
      cy.get(".header__search-input").should("exist");
    });
  });

  it("Should open home page - auto", () => {
    cy.get("h1")
      .should("have.length", 1)
      .find("span")
      .should("have.css", "color", "rgb(217, 4, 41)")
      .as("title");

    cy.get("@title").should("have.text", "Shop");
  });
});
