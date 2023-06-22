const { defineConfig } = require("cypress");
module.exports = defineConfig({

  reporter: "mochawesome",
  reporterOptions: {
    "reportFilename": "[name]-report",
    "overwrite": true,
    "html": true,
    "json": true
  },
  e2e: {
    viewportHeight: 1440,
    viewportHeight: 1080,
    baseUrl: 'https://www.x-kom.pl/',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
