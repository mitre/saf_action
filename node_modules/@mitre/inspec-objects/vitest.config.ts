import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    sequence: {
      concurrent: true,
    },
    testTimeout: 60_000,
  },
});
