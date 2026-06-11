// @ts-check
import { defineConfig } from "astro/config";

// The Replit artifact runner provides PORT (and optionally BASE_PATH).
// Fall back to Astro's defaults for local use.
const port = Number(process.env.PORT) || 4321;
const base = process.env.BASE_PATH || "/";

// https://astro.build/config
export default defineConfig({
  base,
  server: {
    host: "0.0.0.0",
    port,
  },
});
