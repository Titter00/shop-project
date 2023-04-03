/// <reference types="cypress" />

describe("Adding a product to the basket", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should add a product to the basket", () => {
    let totalValue = 0;
    cy.get(".product__price");

    cy.get(".add-to-basket")
      .each((el) => {
        cy.wrap(el).click();

        cy.get(".product__price")
          .invoke("text")
          .then((price) => {
            let productPrice = parseFloat(price);
            totalValue += productPrice;
          });
      })
      .then(() => {
        cy.get(".header__list-amount").invoke("text").should("eq", totalValue.toFixed(2));
      });
  });
});
