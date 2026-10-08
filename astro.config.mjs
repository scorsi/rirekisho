// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import svelte from "@astrojs/svelte";

// Where the site is served from is decided at build time, so the same build works at a domain's
// root or under a sub-path (RIREKISHO_BASE=/rirekisho/).
export default defineConfig({
  site: process.env.RIREKISHO_SITE,
  base: process.env.RIREKISHO_BASE ?? "/",
  trailingSlash: "always",
  integrations: [svelte()],
  // No sharp: its native binaries don't survive a Nix build. The one image is pre-sized instead.
  image: { service: passthroughImageService() },
});
