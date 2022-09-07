import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.kiwi.com/',
    defaultCommandTimeout: 120000,
    specPattern: 'cypress/e2e/**/*.ts'
  },

});
