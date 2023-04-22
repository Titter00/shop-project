class PaginationPage {
  elements = {
    button: () => cy.get("[data-cy='pagination-button']"),
  };

  previousButton() {
    return this.elements.button().eq(0).click();
  }

  nextButton() {
    return this.elements.button().eq(1).click();
  }
}

export default new PaginationPage();
