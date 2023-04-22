class CategoriesPage {
  elements = {
    title: () => cy.get("[data-cy='categories-title']"),
    titleSpan: () => cy.get("[data-cy='categories-title--span']"),
    items: () => cy.get("[data-cy='categories-items']"),
    button: () => cy.get("[data-cy='categories-button']"),
  };

  categoryButton(category) {
    return cy.get(`[data-cy='categories-button']:contains("${category}")`);
  }
}
export default new CategoriesPage();
