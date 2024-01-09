// @ts-check
const { devices } = require('@playwright/test');
const envs = require('../envs/envs.js');

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: '../tests/helpx',
  outputDir: '../test-results',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  /**
   * Location of snapshots generated by expect(page).toHaveScreenshot()
   * and expect(snapshot).toMatchSnapshot().
   */
  snapshotPathTemplate: 'screenshots/{testFilePath}/{arg}{ext}',
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.2 },
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['github'], ['list'], ['../utils/reporters/base-reporter.js']]
    : [
        ['html', { outputFolder: 'test-html-results' }],
        ['list'],
        ['../utils/reporters/base-reporter.js']
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 60000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    baseURL: process.env.PR_BRANCH_LIVE_URL || ( process.env.LOCAL_TEST_LIVE_URL ||'https://helpx-internal.stage.adobe.com'),
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'helpx-live-chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: {
          args: ['--disable-web-security', '--disable-gpu'],
        },
      },
    },

    {
      name: 'helpx-live-firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'helpx-live-webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
};
export default config;
