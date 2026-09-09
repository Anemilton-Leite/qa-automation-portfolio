// ── Custom Commands ──────────────────────────────────────────────────────────
// Encapsulam ações repetitivas, tornando os testes mais legíveis e DRY

/**
 * Login direto via UI
 * Uso: cy.login('standard_user', 'secret_sauce')
 */
Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
  cy.url().should("include", "/inventory");
});

/**
 * Login via localStorage (bypassa UI — mais rápido para testes que não testam login)
 * Uso: cy.loginByLocalStorage()
 */
Cypress.Commands.add("loginByLocalStorage", () => {
  cy.window().then((win) => {
    win.localStorage.setItem(
      "react-hyper",
      JSON.stringify({ username: "standard_user" })
    );
  });
  cy.visit("/inventory.html");
});

/**
 * Adiciona produto ao carrinho pelo nome
 * Uso: cy.addToCart('Sauce Labs Backpack')
 */
Cypress.Commands.add("addToCart", (productName) => {
  cy.contains(".inventory_item_name", productName)
    .parents(".inventory_item")
    .within(() => {
      cy.get("button").click();
    });
});

/**
 * Verifica acessibilidade básica da página atual
 */
Cypress.Commands.add("checkA11y", () => {
  cy.get("body").should("be.visible");
  cy.get("h1, h2, h3").should("exist");
});
