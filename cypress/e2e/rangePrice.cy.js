/// <reference types="cypress" />
import ProductPage from "../support/page-object/productPage";
import PricePage from "../support/page-object/pricePage";

import { data } from "../../src/js/data";
describe("Price range functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Displays all products when range price is set to maximum", () => {
    const maxPrice = Math.floor(Math.max(...data.map((product) => product.price)));
    PricePage.elements
      .range()
      .should("be.visible")
      .invoke("val", maxPrice)
      .trigger("input")
      .should("have.value", maxPrice);

    PricePage.elements.value().should("have.text", maxPrice + "zł");

    ProductPage.elements.product().should("have.length", 6);
  });
  it("Displays all products when range price is set to minimum", () => {
    const minPrice = Math.min(...data.map((product) => product.price));
    PricePage.elements
      .range()
      .should("be.visible")
      .invoke("val", minPrice)
      .trigger("input")
      .should("have.value", minPrice);

    PricePage.elements.value().should("have.text", minPrice + "zł");

    ProductPage.elements.product().should("have.length", 1);
  });

  it("Displays products when range price is 2500", () => {
    const price = 2500;
    PricePage.elements
      .range()
      .should("be.visible")
      .invoke("val", price)
      .trigger("input")
      .should("have.value", price);
    PricePage.elements.value().should("have.text", price + "zł");
    ProductPage.elements.product().should("have.length", 3);
  });
});
