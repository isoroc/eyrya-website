import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.tsx"],
    rules: {
      // next.config.ts sets `images.unoptimized: true`, so next/image performs no
      // optimization here and AGENTS.md mandates plain <img> for logos and icons.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    // The Next.js build output for this project (`distDir: 'dist'` in
    // next.config.ts). Without this, running `npm run lint` after a build lints
    // the minified bundles and buries the real source findings.
    "dist/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
