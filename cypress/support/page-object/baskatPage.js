class BasketPage {
  elements = {
    addToBasketButton: () => cy.get("[data-cy='add-basket']"),
    amount: () => cy.get("[data-cy='header-amount']"),
  };
}
export default new BasketPage();
