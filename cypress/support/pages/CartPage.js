class CartPage {
  get cartIcon()        { return cy.get(".shopping_cart_link"); }
  get cartBadge()       { return cy.get(".shopping_cart_badge"); }
  get cartItems()       { return cy.get(".cart_item"); }
  get checkoutButton()  { return cy.get('[data-test="checkout"]'); }
  get continueButton()  { return cy.get('[data-test="continue-shopping"]'); }
  get removeButtons()   { return cy.get('[data-test^="remove"]'); }

  addFirstProduct() {
    cy.get(".inventory_item").first().within(() => {
      cy.get("button").click();
    });
  }

  addProductByName(name) {
    cy.contains(".inventory_item_name", name)
      .parents(".inventory_item")
      .within(() => {
        cy.get("button").click();
      });
  }

  openCart() {
    this.cartIcon.click();
  }

  removeFirstItem() {
    this.removeButtons.first().click();
  }

  proceedToCheckout() {
    this.checkoutButton.click();
  }

  assertItemCount(count) {
    this.cartBadge.should("have.text", String(count));
  }

  assertCartIsEmpty() {
    this.cartItems.should("not.exist");
    cy.get(".shopping_cart_badge").should("not.exist");
  }

  assertItemInCart(name) {
    this.cartItems.should("contain.text", name);
  }
}

module.exports = new CartPage();
