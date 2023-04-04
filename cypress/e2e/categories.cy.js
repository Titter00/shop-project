/// <reference types="cypress" />
import { data } from "../../src/js/data";
describe("Price range functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders the categories section", () => {
    cy.get(".categories__title").should("contain.text", "Watch our");
    cy.get(".categories__title span").should("have.text", "collection.");
    cy.get(".categories__items").should("exist");
  });

  it("Renders all categories and 'Wszystkie' button", () => {
    const allCategories = ["Computers", "Gaming", "Home", "Foto and Camera", "TV"];
    const expectedCategories = ["Wszystkie", ...allCategories];

    cy.get(".categories__items button").should("have.length", expectedCategories.length);

    expectedCategories.forEach((cat) => {
      cy.get(".categories__items button").should("contain.text", cat);
    });
  });

  it("Renders unique categories only", () => {
    const allCategories = ["Computers", "Gaming", "Home", "Foto and Camera", "TV"];

    allCategories.forEach((cat) => {
      const items = data.filter((item) => item.cat === cat);
      const expectedCount = items.length > 0 ? 1 : 0;

      cy.get(`.categories__items button:contains("${cat}")`).should("have.length", expectedCount);
    });
  });

  it("Selects category when clicked", () => {
    const allCategories = ["Computers", "Gaming", "Home", "Foto and Camera", "TV"];
    const selectedCategory = Cypress._.sample(allCategories);

    const expectedItems = data.filter((item) => item.cat === selectedCategory);

    cy.get(`.categories__items button:contains("${selectedCategory}")`).click();

    cy.get(".product").should("have.length", expectedItems.length);
  });
});
