/// <reference types="cypress" />
import { data } from "../../src/js/data";
describe("Price range functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders the categories section", () => {
    cy.get("[data-cy='categories-title']").should("contain.text", "Watch our");
    cy.get("[data-cy='categories-title--span']").should("have.text", "collection.");
    cy.get("[data-cy='categories-items']").should("exist");
  });

  it("Renders all categories and 'Wszystkie' button", () => {
    const allCategories = ["Computers", "Gaming", "Home", "Foto and Camera", "TV"];
    const expectedCategories = ["Wszystkie", ...allCategories];

    cy.get("[data-cy='categories-button']").should("have.length", expectedCategories.length);

    expectedCategories.forEach((cat) => {
      cy.get("[data-cy='categories-button']").should("contain.text", cat);
    });
  });

  it("Renders unique categories only", () => {
    const allCategories = ["Computers", "Gaming", "Home", "Foto and Camera", "TV"];

    allCategories.forEach((cat) => {
      const items = data.filter((item) => item.cat === cat);
      const expectedCount = items.length > 0 ? 1 : 0;

      cy.get(`[data-cy='categories-button']:contains("${cat}")`).should(
        "have.length",
        expectedCount
      );
    });
  });

  it("Selects category when clicked", () => {
    const allCategories = ["Computers", "Gaming", "Home", "Foto and Camera", "TV"];
    const selectedCategory = Cypress._.sample(allCategories);

    const expectedItems = data.filter((item) => item.cat === selectedCategory);

    cy.get(`[data-cy='categories-button']:contains("${selectedCategory}")`).click();

    cy.get("[data-cy='product']").should("have.length", expectedItems.length);
  });
});
