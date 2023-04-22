class ProductPage {
  elements = {
    productPrice: () => cy.get("[data-cy='product-price']"),
    product: () => cy.get("[data-cy='product']"),
    products: () => cy.get("[data-cy='products']"),
  };
}
export default new ProductPage();
