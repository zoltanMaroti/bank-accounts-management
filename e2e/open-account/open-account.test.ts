import { test, expect } from "@playwright/test";
import { screenshotConfig, snapshotSuffix, viewport } from "@/e2e/config";

test.describe("Open account page visual regression tests", () => {
    test.beforeEach(async ({ page }, snapshot) => {
        snapshot.snapshotSuffix = snapshotSuffix;
        await page.goto("/account/open");
        await page.setViewportSize(viewport);
    });

    test("Page is rendered", async ({ page }) => {
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("open-account.jpeg");
    });

    test("Account description is rendered in preview", async ({ page }) => {
        const description = await page.getByTestId("account-description");
        await description.fill("This is a test description");
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("account-description.jpeg");
    });

    test("Account currency is rendered in preview", async ({ page }) => {
        await page.getByTestId("currency-selector").selectOption("EUR");
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("account-currency.jpeg");
    });

    test("Form validation errors are rendered", async ({ page }) => {
        const button = await page.getByTestId("submit-account");
        await button.click();
        await page.waitForTimeout(300);
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("validation-errors.jpeg");
    });
});
