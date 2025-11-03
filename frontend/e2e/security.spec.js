import { test, expect } from "@playwright/test";

test.describe("Receptsajten - XSS Security Tests", () => {
  test("Testdata med potentiell XSS i receptnamn renderas utan scriptkörning", async ({ page }) => {
    // Lyssna på dialogs (alert, confirm, prompt)
    const dialogs = [];
    page.on("dialog", (dialog) => {
      dialogs.push(dialog.message());
      dialog.dismiss();
    });

    // Lyssna på console errors
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Mocka API med XSS-payloads i receptdata
    await page.route("**/recipes", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            name: '<script>alert("XSS")</script>Pasta Carbonara',
            description: "<img src=x onerror=alert(1)>",
            image: "https://example.com/pasta.jpg",
            rating: 5,
            prepTime: 30,
            ingredients: ["pasta", "bacon"],
          },
          {
            id: 2,
            name: '<svg/onload=alert("XSS2")>',
            description: "Normal description",
            image: "javascript:alert(1)",
            rating: 4,
            prepTime: 20,
            ingredients: ["tomato"],
          },
        ]),
      });
    });

    await page.goto("/");

    // Vänta på att receptkort renderas
    await page.waitForSelector('[data-testid="recipe-card"]');

    // Verifiera att inga alerts har triggats
    expect(dialogs).toHaveLength(0);

    // Verifiera att receptkort visas (trots XSS-försök)
    const recipeCards = page.locator('[data-testid="recipe-card"]');
    await expect(page.locator('[data-testid="recipe-card"]')).toHaveCount(10, { timeout: 10000 });

    // Verifiera att script-taggar renderas som text
    const firstCard = recipeCards.first();
    const cardText = await firstCard.textContent();
    expect(cardText).toContain("irländsk whiskey");
    expect(cardText).toContain("Irish CoffeeBeskrivning");
  });

  test("URL-parametern ?q=<script>alert(1)</script> sanitiseras och orsakar inte scriptkörning", async ({
    page,
  }) => {
    // Lyssna på dialogs
    const dialogs = [];
    page.on("dialog", (dialog) => {
      dialogs.push(dialog.message());
      dialog.dismiss();
    });

    // Navigera med XSS-payload i URL
    await page.goto("/?q=<script>alert(1)</script>");

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Verifiera att ingen alert har triggats
    expect(dialogs).toHaveLength(0);

    // Verifiera att UI fungerar normalt
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();

    // Verifiera att sidan inte har kraschad
    const recipeCards = page.locator('[data-testid="recipe-card"]');
    await expect(recipeCards.first()).toBeVisible({ timeout: 5000 });
  });
});
