import { test, expect } from "@playwright/test";

test.describe("Receptsajten - Error Handling", () => {
  test('API-fel: användaren ser felmeddelande och "Försök igen"-knapp fungerar', async ({
    page,
  }) => {
    // Intercepta API-anrop och returnera fel
    await page.route("**/recipes", (route) => {
      route.abort("failed");
    });

    await page.goto("/");

    // Verifiera att felmeddelande visas
    const errorMessage = page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    await expect(errorMessage).toContainText(/fel|error|kunde inte|failed/i);

    // Verifiera att "Försök igen"-knapp finns
    const retryButton = page.locator('[data-testid="retry-button"]');
    await expect(retryButton).toBeVisible();

    // Ta bort route-block för att låta retry lyckas
    await page.unroute("**/recipes");

    // Klicka på "Försök igen"
    await retryButton.click();

    // Vänta på att API:et för recipes returnerar framgång innan vi kollar UI:t
    await page.waitForResponse(
      (response) => response.url().includes("/recipes") && response.status() === 200,
      { timeout: 10000 }
    );

    // Verifiera att recept laddas efter retry (välj första receptlänk istället för data-testid)
    const firstRecipeLink = page.locator('a[href^="/recipe/"]').first();
    await expect(firstRecipeLink).toBeVisible({ timeout: 10000 });
  });

  test("Tom-/fel-state: inga recept visar rätt meddelande", async ({ page }) => {
    // Intercepta API och returnera tom array
    await page.route("**/recipes", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    await page.goto("/");

    // Verifiera att "inga recept"-meddelande visas
    const emptyMessage = page.locator('[data-testid="empty-state"]');
    await expect(emptyMessage).toBeVisible({ timeout: 5000 });
    await expect(emptyMessage).toContainText(/inga recept|no recipes|hittades inte/i);
  });
});
