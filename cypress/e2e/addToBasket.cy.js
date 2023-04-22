/// <reference types="cypress" />
import ProductPage from "../support/page-object/productPage";
import BasketPage from "../support/page-object/baskatPage";

describe("Adding a product to the basket", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should add a product to the basket and sum it", () => {
    let totalValue = 0;

    BasketPage.elements
      .addToBasketButton()
      .each((el) => {
        cy.wrap(el).click();
      })
      .then(() => {
        ProductPage.elements
          .productPrice()
          .each((price) => {
            let productPrice = parseFloat(price.text());
            totalValue += productPrice;
          })
          .then(() => {
            BasketPage.elements
              .amount()
              .invoke("text")
              .should("eq", `${totalValue.toFixed(2)} zł`);
          });
      });
  });
});
