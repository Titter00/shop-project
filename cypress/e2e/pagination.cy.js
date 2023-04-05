/// <reference types="cypress" />
describe("Pagination functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should display correct number of buttons", () => {
    cy.get(".pagination__button").then((buttons) => {
      expect(buttons.length).to.eq(2);
    });

    cy.get(".product").then((products) => {
      expect(products.length).to.be.lte(6);
    });

    cy.get(".pagination__button").eq(1).click();

    cy.get(".product").then((products) => {
      expect(products.length).to.be.lte(6);
    });
  });

  it("should navigate to next and previous page", () => {
    cy.get(".pagination__button").eq(1).click();

    cy.get(".pagination__button").eq(0).click();

    cy.get(".pagination__button").eq(1).click();
  });

  it("should disable previous button on first page", () => {
    cy.get(".pagination__button").eq(0).should("be.disabled");
  });

  it("should disable next button on last page", () => {
    cy.get(".pagination__button").eq(1).click();

    cy.get(".pagination__button").eq(1).should("be.disabled");
  });
});
