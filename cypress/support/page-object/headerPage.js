class HeaderPage {
  elements = {
    container: () => cy.get("[data-cy='header-container']"),
    title: () => cy.get("[data-cy='header-title']"),
    icon: () => cy.get("[data-cy='header-icon']"),
    input: () => cy.get("[data-cy='header-input']"),
    search: () => cy.get("[data-cy='header-search']"),
    inputImg: () => cy.get("[data-cy='header-input--img']"),
  };
}
export default new HeaderPage();
