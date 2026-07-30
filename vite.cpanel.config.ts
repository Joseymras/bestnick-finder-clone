// Temporary build config used only to produce a portable Node server build,
// which is then crawled to generate the static cPanel-ready bundle.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "node-server",
    output: { dir: "dist-node" },
  },
});
