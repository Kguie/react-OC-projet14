import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/test/setup.ts",
    css: true,
    deps: {
      inline: ["@kguie/data-table"],
    },
  },
});
