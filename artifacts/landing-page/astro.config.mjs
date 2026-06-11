// @ts-check
import { defineConfig } from "astro/config";

const port = Number(process.env.PORT) || 4321;
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,
  server: {
    host: "0.0.0.0",
    port,
  },
});
