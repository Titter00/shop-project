/// <reference types="cypress" />

describe("E2E - search input cases", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should display search input field", () => {
    cy.get(".header__search").within(() => {
      cy.get(".header__search-input")
        .should("be.visible")
        .should("have.attr", "placeholder", "Wyszukaj w sklepie...");
      cy.get(".header__search__icon img")
        .should("be.visible")
        .should("have.attr", "alt", "Shopping basket");
    });
  });

  it("displays all products when search input is empty", () => {
    cy.get(".header__search-input").type("{enter}");
    cy.get(".product").should("have.length", 6);
  });
  it("displays only matching products when search input is not empty", () => {
    const searchTerm = "Laptop";
    cy.get(".header__search-input").type(searchTerm);
    cy.get(".product")
      .should("have.length", 4)
      .each((list) => {
        cy.wrap([...list].slice(0, 4))
          .contains(searchTerm)
          .should("be.visible");
      });
    cy.get(".header__search-input").clear();
  });
});
