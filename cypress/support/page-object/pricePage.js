class PricePage {
  elements = {
    button: () => cy.get("[data-cy='pagination-button']"),
    range: () => cy.get("[data-cy='price-range']"),
    value: () => cy.get("[data-cy='price-value']"),
  };
}

export default new PricePage();
