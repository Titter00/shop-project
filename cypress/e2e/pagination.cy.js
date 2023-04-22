/// <reference types="cypress" />
import ProductPage from "../support/page-object/productPage";
import PaginationPage from "../support/page-object/paginationPage";

describe("Pagination functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should display correct number of buttons", () => {
    PaginationPage.elements.button().then((buttons) => {
      expect(buttons.length).to.eq(2);
    });

    ProductPage.elements.product().then((products) => {
      expect(products.length).to.be.lte(6);
    });

    PaginationPage.nextButton();

    ProductPage.elements.product().then((products) => {
      expect(products.length).to.be.lte(6);
    });
  });

  it("should navigate to next and previous page", () => {
    PaginationPage.nextButton();

    PaginationPage.previousButton();

    PaginationPage.nextButton();
  });

  it("should disable previous button on first page", () => {
    PaginationPage.elements.button().eq(0).should("be.disabled");
  });

  it("should disable next button on last page", () => {
    PaginationPage.nextButton();

    PaginationPage.elements.button().eq(1).should("be.disabled");
  });
});
