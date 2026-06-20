import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "src/tests/e2e/**/*.cy.ts",
    supportFile: false,
  },
});
