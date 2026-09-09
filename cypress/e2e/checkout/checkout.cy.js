import CartPage from "../../support/pages/CartPage";
import CheckoutPage from "../../support/pages/CheckoutPage";

describe("💳 Checkout — Fluxo de Compra", () => {
  let users, info;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
      info = data.checkoutInfo;
    });
  });

  beforeEach(() => {
    cy.login(users.validUser.username, users.validUser.password);
    CartPage.addFirstProduct();
    CartPage.openCart();
  });

  context("✅ Fluxo Completo", () => {
    it("TC014 — deve completar compra com sucesso (happy path)", () => {
      CartPage.proceedToCheckout();
      CheckoutPage.fillPersonalInfo(info.firstName, info.lastName, info.zipCode);
      CheckoutPage.clickContinue();
      CheckoutPage.assertTotalVisible();
      CheckoutPage.clickFinish();
      CheckoutPage.assertOrderComplete();
    });

    it("TC015 — deve exibir resumo com preço antes de finalizar", () => {
      CartPage.proceedToCheckout();
      CheckoutPage.fillPersonalInfo(info.firstName, info.lastName, info.zipCode);
      CheckoutPage.clickContinue();
      cy.get(".summary_subtotal_label").should("be.visible");
      cy.get(".summary_tax_label").should("be.visible");
      CheckoutPage.assertTotalVisible();
    });
  });

  context("❌ Cenários de Erro", () => {
    it("TC016 — deve bloquear checkout sem preencher nome", () => {
      CartPage.proceedToCheckout();
      CheckoutPage.clickContinue();
      CheckoutPage.assertErrorMessage("First Name is required");
    });

    it("TC017 — deve bloquear checkout sem preencher sobrenome", () => {
      CartPage.proceedToCheckout();
      CheckoutPage.firstNameInput.type(info.firstName);
      CheckoutPage.clickContinue();
      CheckoutPage.assertErrorMessage("Last Name is required");
    });

    it("TC018 — deve bloquear checkout sem CEP", () => {
      CartPage.proceedToCheckout();
      CheckoutPage.firstNameInput.type(info.firstName);
      CheckoutPage.lastNameInput.type(info.lastName);
      CheckoutPage.clickContinue();
      CheckoutPage.assertErrorMessage("Postal Code is required");
    });
  });
});
