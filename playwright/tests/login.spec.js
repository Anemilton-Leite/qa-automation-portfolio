const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

const VALID_USER = { username: "standard_user", password: "secret_sauce" };
const LOCKED_USER = { username: "locked_out_user", password: "secret_sauce" };

test.describe("🔐 Login — Cross-browser (Playwright)", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("TC-PW001 — login válido redireciona para inventory", async ({ page }) => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("TC-PW002 — usuário bloqueado exibe mensagem correta", async () => {
    await loginPage.login(LOCKED_USER.username, LOCKED_USER.password);
    await loginPage.assertError("Sorry, this user has been locked out");
  });

  test("TC-PW003 — campos vazios exibem erro de validação", async () => {
    await loginPage.loginButton.click();
    await loginPage.assertError("Username is required");
  });

  test("TC-PW004 — senha errada exibe mensagem de credenciais inválidas", async () => {
    await loginPage.login("standard_user", "wrong_password");
    await loginPage.assertError("Username and password do not match");
  });
});
