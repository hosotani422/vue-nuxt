module.exports = {
  appCommand: `npm run dev`,
  appInitDelay: 7000,
  src: [`./test/testcafe/e2e`],
  browsers: [`chrome:headless`],
  baseUrl: `http://localhost:3000/list0000000000000`,
  skipJsErrors: true,
  concurrency: 3,
  screenshots: {
    path: `./test/testcafe/screenshots`,
    takeOnFails: false,
    fullPage: true,
  },
};
