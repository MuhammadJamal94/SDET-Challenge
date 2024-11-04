import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    // {
    //     name: 'firefox',
    //     use: { browserName: 'firefox' },
    // },
    // {
    //     name: 'webkit',
    //     use: { browserName: 'webkit' },
    // },
  ],
  reporter: [["html", { outputFolder: "tests/playwright-report" }]],
  timeout: 30000,
};

export default config;
