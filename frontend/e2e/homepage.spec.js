import { test, expect } from "@playwright/test";

test.describe("Receptsajten - Homepage", () => {
  test("Happy path: startsidan visar receptkort och kategorier", async ({ page }) => {
    await page.goto("/");

    // Vänta på att receptkort ska laddas
    await expect(page.locator('[data-testid="recipe-card"]').first()).toBeVisible({
      timeout: 10000,
    });

    // Verifiera att minst ett receptkort visas
    const recipeCards = page.locator('[data-testid="recipe-card"]');
    const count = await recipeCards.count();
    expect(count).toBeGreaterThan(0, "Det borde finnas minst ett receptkort på startsidan.");

    // Verifiera att kategorilista visas
    const categories = page.locator('[data-testid="category-list"]');
    await expect(categories).toBeVisible();
  });

  test("Sökflöde: sökning minskar lista, rensa visar alla igen, query i URL funkar på reload", async ({
    page,
  }) => {
    await page.goto("/");

    // Vänta på att sidan laddas
    await page.waitForLoadState("networkidle");

    // Räkna antal recept innan sökning
    const initialCount = await page.locator('[data-testid="recipe-card"]').count();

    // Sök efter något specifikt
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("pasta");

    // Vänta på filtrering
    await page.waitForTimeout(500);

    // Verifiera att listan har ändrats (antingen färre eller samma om alla är pasta)
    const filteredCount = await page.locator('[data-testid="recipe-card"]').count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);

    // Verifiera att URL innehåller query-parametern
    await expect(page).toHaveURL(/\?q=pasta/);

    // Rensa sökningen
    const clearButton = page.locator('[data-testid="clear-search"]');
    await clearButton.click();

    // Verifiera att alla recept visas igen
    await expect(page.locator('[data-testid="recipe-card"]')).toHaveCount(initialCount);

    // Testa reload med query i URL
    await page.goto("/?q=pasta");
    await page.waitForLoadState("networkidle");

    // Verifiera att sökningen är aktiv efter reload
    await expect(searchInput).toHaveValue("pasta");
  });
});
