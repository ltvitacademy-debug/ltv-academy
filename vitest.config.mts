import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, ".") },
  },
  // Next.js's tsconfig.json sets jsx: "preserve" (correct for Next's own
  // SWC compiler). Vite 8's test transform runs on oxc, not esbuild, and
  // oxc reads that same tsconfig setting by default — so without this
  // override it inherits "preserve" and can't parse JSX at all ("make sure
  // to not set jsx to preserve"). This only affects THIS test run, never
  // the actual `next build`, which never reads vitest's config.
  oxc: { jsx: { runtime: "automatic" } },
});
