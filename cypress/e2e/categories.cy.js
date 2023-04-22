/// <reference types="cypress" />
import CategoriesPage from "../support/page-object/categoriesPage";
import ProductPage from "../support/page-object/productPage";
import { data } from "../../src/js/data";

describe("Price range functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders the categories section", () => {
    CategoriesPage.elements.title().should("contain.text", "Watch our");
    CategoriesPage.elements.titleSpan().should("have.text", "collection.");
    CategoriesPage.elements.items().should("exist");
  });

  it("Renders all categories and 'Wszystkie' button", () => {
    const allCategories = ["Computers", "Gaming", "Home", "Foto and Camera", "TV"];
    const expectedCategories = ["Wszystkie", ...allCategories];

    CategoriesPage.elements.button().should("have.length", expectedCategories.length);

    expectedCategories.forEach((cat) => {
      CategoriesPage.elements.button().should("contain.text", cat);
    });
  });

  it("Renders unique categories only", () => {
    const allCategories = ["Computers", "Gaming", "Home", "Foto and Camera", "TV"];

    allCategories.forEach((category) => {
      const items = data.filter((item) => item.cat === category);
      const expectedCount = items.length > 0 ? 1 : 0;

      CategoriesPage.categoryButton(category).should("have.length", expectedCount);
    });
  });

  it("Selects category when clicked", () => {
    const allCategories = ["Computers", "Gaming", "Home", "Foto and Camera", "TV"];
    const selectedCategory = Cypress._.sample(allCategories);

    const expectedItems = data.filter((item) => item.cat === selectedCategory);

    CategoriesPage.categoryButton(selectedCategory).click();

    ProductPage.elements.product().should("have.length", expectedItems.length);
  });
});
