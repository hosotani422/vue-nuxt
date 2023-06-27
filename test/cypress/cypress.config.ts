import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3000`,
    specPattern: `test/cypress/e2e/**/*.ts`,
    // supportFile: `test/cypress/support/**/*.ts`,
    supportFile: false,
    fixturesFolder: `test/cypress/fixtures`,
    downloadsFolder: `test/cypress/downloads`,
    screenshotsFolder: `test/cypress/screenshots`,
    screenshotOnRunFailure: false,
    videosFolder: `test/cypress/videos`,
    video: false,
  },
});
