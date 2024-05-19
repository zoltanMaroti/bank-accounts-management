import { PageScreenshotOptions } from "@playwright/test";

export const screenshotConfig: PageScreenshotOptions = {
    fullPage: true,
    quality: 90,
    type: "jpeg",
    animations: "disabled",
};

export const viewport = { width: 1366, height: 768 };

export const snapshotSuffix = "snapshot";
