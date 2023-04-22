/// <reference types="cypress" />
import ProductPage from "../support/page-object/productPage";
import HeaderPage from "../support/page-object/headerPage";

describe("E2E - search input cases", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should display search input field", () => {
    HeaderPage.elements.search().within(() => {
      HeaderPage.elements
        .input()
        .should("be.visible")
        .should("have.attr", "placeholder", "Wyszukaj w sklepie...");
      HeaderPage.elements
        .inputImg()
        .should("be.visible")
        .should("have.attr", "alt", "Shopping basket");
    });
  });

  it("displays all products when search input is empty", () => {
    HeaderPage.elements.input().type("{enter}");
    ProductPage.elements.product().should("have.length", 6);
  });
  it("displays only matching products when search input is not empty", () => {
    const searchTerm = "Laptop";
    HeaderPage.elements.input().type(searchTerm);
    ProductPage.elements
      .product()
      .should("have.length", 4)
      .each((list) => {
        cy.wrap([...list].slice(0, 4))
          .contains(searchTerm)
          .should("be.visible");
      });
    HeaderPage.elements.input().clear();
  });
});
