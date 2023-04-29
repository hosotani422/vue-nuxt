import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3000`,
    specPattern: `test/cypress/e2e/**/*.ts`,
    supportFile: false,
    // supportFile: `test/cypress/support/**/*.ts`,
    fixturesFolder: `test/cypress/fixtures`,
    downloadsFolder: `test/cypress/downloads`,
    screenshotOnRunFailure: false,
    screenshotsFolder: `test/cypress/screenshots`,
    video: false,
    videosFolder: `test/cypress/videos`,
  },
});
