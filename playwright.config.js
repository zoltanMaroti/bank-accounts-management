import { defineConfig, devices } from "@playwright/test";
import path from "path";

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}`;

const browserConfig = {
    expect: {
        toHaveScreenshot: { maxDiffPixelRatio: 0.1, animations: "disabled" },
    },
};

export default defineConfig({
    testDir: path.join(__dirname, "e2e"),
    outputDir: path.join(__dirname, "e2e", "test-results"),
    reporter: [
        ["list"],
        [
            "html",
            { outputFolder: path.join(__dirname, "e2e", "report", "html") },
        ],
    ],
    webServer: {
        command: "npm run e2e",
        url: baseURL,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
        stdout: "pipe",
        stderr: "pipe",
    },
    timeout: 30 * 1000,
    fullyParallel: true,
    use: {
        baseURL,
        trace: "off",
        screenshot: "only-on-failure",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
            ...browserConfig,
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
            ...browserConfig,
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
            ...browserConfig,
        },
    ],
});
