import LoginPage from "../../support/pages/LoginPage";

describe("🔐 Autenticação — Login", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  // ── Cenários Positivos ───────────────────────────────────────────────────
  context("✅ Cenários Positivos", () => {
    it("TC001 — deve logar com sucesso com credenciais válidas", () => {
      LoginPage.login(users.validUser.username, users.validUser.password);
      LoginPage.assertOnInventoryPage();
      cy.get(".title").should("have.text", "Products");
    });

    it("TC002 — deve manter sessão após reload da página", () => {
      cy.login(users.validUser.username, users.validUser.password);
      cy.reload();
      cy.url().should("include", "/inventory");
    });
  });

  // ── Cenários Negativos ───────────────────────────────────────────────────
  context("❌ Cenários Negativos", () => {
    it("TC003 — deve exibir erro com senha incorreta", () => {
      LoginPage.login(users.invalidUser.username, users.invalidUser.password);
      LoginPage.assertErrorMessage("Username and password do not match");
    });

    it("TC004 — deve exibir erro para usuário bloqueado", () => {
      LoginPage.login(users.lockedUser.username, users.lockedUser.password);
      LoginPage.assertErrorMessage("Sorry, this user has been locked out");
    });

    it("TC005 — deve exibir erro quando username está vazio", () => {
      LoginPage.fillPassword(users.validUser.password);
      LoginPage.clickLogin();
      LoginPage.assertErrorMessage("Username is required");
    });

    it("TC006 — deve exibir erro quando senha está vazia", () => {
      LoginPage.fillUsername(users.validUser.username);
      LoginPage.clickLogin();
      LoginPage.assertErrorMessage("Password is required");
    });

    it("TC007 — deve exibir erro quando ambos os campos estão vazios", () => {
      LoginPage.clickLogin();
      LoginPage.assertErrorMessage("Username is required");
    });

    it("TC008 — deve limpar mensagem de erro ao corrigir os campos", () => {
      LoginPage.login(users.invalidUser.username, users.invalidUser.password);
      LoginPage.assertErrorMessage("Username and password do not match");
      cy.get('[data-test="error-button"]').click();
      LoginPage.errorMessage.should("not.exist");
    });
  });
});
