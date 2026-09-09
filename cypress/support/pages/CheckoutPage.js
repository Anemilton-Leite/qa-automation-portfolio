class CheckoutPage {
  get firstNameInput()    { return cy.get('[data-test="firstName"]'); }
  get lastNameInput()     { return cy.get('[data-test="lastName"]'); }
  get zipCodeInput()      { return cy.get('[data-test="postalCode"]'); }
  get continueButton()    { return cy.get('[data-test="continue"]'); }
  get finishButton()      { return cy.get('[data-test="finish"]'); }
  get confirmationTitle() { return cy.get(".complete-header"); }
  get errorMessage()      { return cy.get('[data-test="error"]'); }
  get summaryTotal()      { return cy.get(".summary_total_label"); }

  fillPersonalInfo(firstName, lastName, zipCode) {
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
    this.zipCodeInput.type(zipCode);
  }

  clickContinue() {
    this.continueButton.click();
  }

  clickFinish() {
    this.finishButton.click();
  }

  completeCheckout(firstName, lastName, zipCode) {
    this.fillPersonalInfo(firstName, lastName, zipCode);
    this.clickContinue();
    this.clickFinish();
  }

  assertOrderComplete() {
    this.confirmationTitle
      .should("be.visible")
      .and("contain.text", "Thank you for your order!");
  }

  assertErrorMessage(message) {
    this.errorMessage.should("be.visible").and("contain.text", message);
  }

  assertTotalVisible() {
    this.summaryTotal.should("be.visible");
  }
}

module.exports = new CheckoutPage();
