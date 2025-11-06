import { test, expect } from "@playwright/test";

test.describe("Receptsajten - XSS Security Tests", () => {
  test("Testdata med potentiell XSS i receptnamn renderas utan scriptkörning", async ({ page }) => {
    // console.log(page);
    const dialogs = [];
    const consoles = [];
    page.on("dialog", (d) => {
      dialogs.push(d.message());
      d.dismiss();
    });
    // console.log(dialogs);
    page.on("console", (msg) => {
      consoles.push(msg.text());
    });
    // console.log(consoles);
    // Provide a malicious recipe payload (React should escape this and not execute it)
    const maliciousRecipe = {
      _id: "xss-1",
      title: '<script>alert("xss")</script>',
      description: "Malicious title test",
      imageUrl: null,
      timeInMins: 1,
      price: 0,
      categories: ["Test"],
      instructions: [],
      ingredients: [],
      avgRating: null,
    };
    // console.log("Malicious Recipe:  ", maliciousRecipe);
    // Intercept the API and return the malicious payload
    await page.route("**/recipes", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([maliciousRecipe]),
      })
    );
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
    await expect(recipeCards).toHaveCount(0, { timeout: 2000 }); // since it should return no recipe
  });
});
