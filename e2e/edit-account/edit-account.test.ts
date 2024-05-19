import { test, expect } from "@playwright/test";
import { screenshotConfig, snapshotSuffix, viewport } from "@/e2e/config";

test.describe("Edit account page visual regression tests", () => {
    test.beforeEach(async ({ page }, snapshot) => {
        snapshot.snapshotSuffix = snapshotSuffix;
        await page.setViewportSize(viewport);
    });

    test("Not found message is rendered", async ({ page }) => {
        await page.goto("/account/notexistingaccount");
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("not-found.jpeg");
    });

    test("Delete button is enabled when account balance is 0", async ({
        page,
    }) => {
        await page.goto("/account/0f844aa6-03a4-4059-8d80-9990903edfa8");
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("delete-button.jpeg");
    });

    test("Delete modal is rendered", async ({ page }) => {
        await page.goto("/account/0f844aa6-03a4-4059-8d80-9990903edfa8");
        const button = await page.getByTestId("delete-account-button");
        await button.click();
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("delete-modal.jpeg");
    });
});
