const { test, expect } = require("@playwright/test");

test.describe("📸 Testes Visuais — Screenshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory/);
  });

  test("TC-VIS001 — página de produtos deve bater com snapshot", async ({ page }) => {
    await expect(page).toHaveScreenshot("inventory-page.png", {
      maxDiffPixels: 100,
    });
  });

  test("TC-VIS002 — página de carrinho deve bater com snapshot", async ({ page }) => {
    await page.click(".shopping_cart_link");
    await expect(page).toHaveScreenshot("cart-page.png", {
      maxDiffPixels: 100,
    });
  });

  test("TC-VIS003 — modal de menu lateral deve aparecer corretamente", async ({ page }) => {
    await page.click("#react-burger-menu-btn");
    await expect(page.locator(".bm-menu-wrap")).toBeVisible();
    await expect(page.locator(".bm-menu-wrap")).toHaveScreenshot("sidebar-menu.png");
  });
});
