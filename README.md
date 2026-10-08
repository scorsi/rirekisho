# rirekisho (履歴書)

My résumé: a static site (Astro, with Svelte for the bits that need it) and its PDF, printed from the
page itself. French and English.

```sh
nix develop         # node, pnpm (and Chromium on Linux)
pnpm install
pnpm dev            # http://localhost:4321, drafts included
pnpm build && pnpm pdf
```

Content lives in `src/data/*.toml`, validated at build time (`src/content.config.ts`). The phone
number is not in the repository: set `RIREKISHO_PHONE` when building.
