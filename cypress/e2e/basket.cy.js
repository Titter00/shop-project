/// <reference types="cypress" />

describe("Adding a product to the basket", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should add a product to the basket and sum it", () => {
    let totalValue = 0;

    cy.get(".add-to-basket")
      .each((el) => {
        cy.wrap(el).click();
      })
      .then(() => {
        cy.get(".product__price")
          .each((price) => {
            let productPrice = parseFloat(price.text());
            totalValue += productPrice;
            cy.log(totalValue);
          })
          .then(() => {
            cy.get(".header__list-amount")
              .invoke("text")
              .should("eq", `${totalValue.toFixed(2)} zł`);
          });
      });
  });
});
