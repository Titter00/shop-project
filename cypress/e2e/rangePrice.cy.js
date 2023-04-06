/// <reference types="cypress" />
import { data } from "../../src/js/data";
describe("Price range functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Displays all products when range price is set to maximum", () => {
    const maxPrice = Math.floor(Math.max(...data.map((product) => product.price)));
    cy.get("[data-cy='price-range']")
      .should("be.visible")
      .invoke("val", maxPrice)
      .trigger("input")
      .should("have.value", maxPrice);

    cy.get("[data-cy='price-value']").should("have.text", maxPrice + "zł");

    cy.get("[data-cy='product']").should("have.length", 6);
  });
  it("Displays all products when range price is set to minimum", () => {
    const minPrice = Math.min(...data.map((product) => product.price));
    cy.get("[data-cy='price-range']")
      .should("be.visible")
      .invoke("val", minPrice)
      .trigger("input")
      .should("have.value", minPrice);

    cy.get("[data-cy='price-value']").should("have.text", minPrice + "zł");

    cy.get("[data-cy='product']").should("have.length", 1);
  });

  it("Displays products when range price is 2500", () => {
    const price = 2500;
    cy.get("[data-cy='price-range']")
      .should("be.visible")
      .invoke("val", price)
      .trigger("input")
      .should("have.value", price);
    cy.get("[data-cy='price-value']").should("have.text", price + "zł");
    cy.get("[data-cy='product']").should("have.length", 3);
  });
});
