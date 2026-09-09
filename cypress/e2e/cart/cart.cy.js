import CartPage from "../../support/pages/CartPage";

describe("🛒 Carrinho de Compras", () => {
  let users, checkoutInfo;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
      checkoutInfo = data.checkoutInfo;
    });
  });

  beforeEach(() => {
    cy.login(users.validUser.username, users.validUser.password);
  });

  context("✅ Adicionar Produtos", () => {
    it("TC009 — deve adicionar o primeiro produto ao carrinho", () => {
      CartPage.addFirstProduct();
      CartPage.assertItemCount(1);
    });

    it("TC010 — deve adicionar múltiplos produtos ao carrinho", () => {
      cy.get('[class="btn btn_primary btn_small btn_inventory"]').eq(0).click();
      cy.get('[class="btn btn_primary btn_small btn_inventory"]').eq(0).click();
      CartPage.assertItemCount(2);
    });

    it("TC011 — deve exibir produto correto dentro do carrinho", () => {
      const productName = "Sauce Labs Backpack";
      cy.addToCart(productName);
      CartPage.openCart();
      CartPage.assertItemInCart(productName);
    });
  });

  context("🗑️ Remover Produtos", () => {
    it("TC012 — deve remover produto e atualizar badge do carrinho", () => {
      CartPage.addFirstProduct();
      CartPage.assertItemCount(1);
      CartPage.openCart();
      CartPage.removeFirstItem();
      CartPage.assertCartIsEmpty();
    });
  });

  context("🔄 Persistência", () => {
    it("TC013 — carrinho deve persistir após navegar para outra página", () => {
      CartPage.addFirstProduct();
      CartPage.assertItemCount(1);
      cy.get(".product_sort_container").select("lohi");
      CartPage.assertItemCount(1);
    });
  });
});
