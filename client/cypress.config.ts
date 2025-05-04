import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportWidth: 1200,
    viewportHeight: 800,
    video: false,
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/integration/**/*.spec.ts',
    supportFile: 'cypress/support/index.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
