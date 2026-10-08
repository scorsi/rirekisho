# CLAUDE.md

Guidance for Claude Code when working in this repo. See [README.md](README.md) for what it is.

## Conventions

- **Comments: English, why not what.** Only comment non-obvious reasoning (a constraint, an
  upstream quirk, why something is left out) — never restate what the code already says. Content
  (`src/data/*.toml`) and UI strings (`src/i18n/ui.ts`) are the résumé itself: French first.
- **pnpm only**, supplied by the Nix dev shell (`nix develop`, or direnv's `use flake`). No npm, and
  no `packageManager` field in `package.json`: Nix pins pnpm, corepack must not fight it.
- Formatting: `pnpm format` (prettier with the astro and svelte plugins); `pnpm lint` also runs
  `astro check`. Nix: `nix fmt`.
- **TypeScript 6, not 7**: `@astrojs/check` and the Astro language server don't support 7 yet.
- **No sharp.** Its native binaries break the Nix build, so images go through
  `passthroughImageService` and are pre-sized by hand: `src/assets/photo.webp` is a 320 px wide,
  cropped, black-and-white WebP. A new photo gets the same treatment (crop, resize, webp) outside
  the build, never by adding sharp back.
- One Svelte island only, `src/components/ThemeToggle.svelte` (`client:only`): everything else is
  static Astro. Add an island only for something that genuinely needs client state.

## Standing rules

1. **No personal contact data in the repo.** The email address and the phone number are read at
   build time from `RIREKISHO_EMAIL` and `RIREKISHO_PHONE` (`src/lib/contact.ts`); without a
   variable its line is simply left out. Never commit them, never put them in a Nix derivation (the
   store is world-readable): `nix/package.nix` deliberately doesn't read them, CI passes them as
   Forgejo secrets. The history was rewritten to remove both; keep it that way.
2. **Where the site lives is decided at build time**: `RIREKISHO_BASE` (base path, default `/`)
   and `RIREKISHO_SITE` (public URL, `astro.config.mjs`). The PDF's "online version" QR code is
   only generated when `RIREKISHO_SITE` is set.
3. **The PDF is the web page.** `scripts/pdf.mjs` serves `dist/` locally and prints `/fr/` and
   `/en/` with Chromium (playwright-core) to `dist/rirekisho-<lang>.pdf`. Layout changes for the
   PDF go in `@media print` rules, never in a second template.
4. **Chromium comes from Nix**: `$CHROMIUM_PATH`, set by the dev shell — `chromium` on Linux (CI),
   Playwright's Chrome for Testing (`playwright-driver.browsers-chromium`) on macOS. It is a build
   dependency of the PDF, so it stays here even if a system config also installs one.

## Content

- `src/data/*.toml`, one collection per file, loaded by Astro's `file()` loader and validated by
  Zod in `src/content.config.ts`. A build fails on invalid data: that's the point.
- Dates are `"YYYY-MM"`. No `end` means ongoing. `draft = true` shows an entry in `pnpm dev` only,
  so an incomplete entry can be committed.
- Translatable text is `{ fr = "...", en = "..." }`: `fr` is required, any other locale falls back
  to `fr` when missing (`src/i18n/localized.ts`), so translations can land progressively.
- Job titles mirror the employment contract (no "Senior" that the contract doesn't say).

## i18n

- Locales: `src/i18n/locales.ts` (`fr`, `en`). Adding one (e.g. `ja`) = add it there and its strings
  in `src/i18n/ui.ts`; `scripts/pdf.mjs` prints `fr,en` unless `RIREKISHO_LOCALES` says otherwise.
  A Japanese page also needs the full Noto Serif JP (see the font note below).
- Pages: `/fr/` and `/en/` from `src/pages/[lang]/index.astro`; `/` picks the browser's language
  client-side (a static host has no `Accept-Language`), falling back to the default locale.

## Design: « Sumi » (墨)

A classic, editorial résumé anyone can read, with discreet "nerd" touches. Ink on paper, a single
vermilion (朱) accent. Refine it; don't reinvent it.

- **Colours** are tokens in `src/styles/global.css`, never literals in components.
  Light: bg `#f7f5f0`, paper `#fffefb`, ink `#1a1917`, muted `#736e66`, rules `#e2ddd3`, vermilion
  `#c23b22` (soft `#f4e1dc`). Dark: bg `#121110`, paper `#181716`, ink `#ebe7df`, muted `#9b958b`,
  rules `#2c2a27`, vermilion `#ec6a4f`.
- **Theme** follows the system by default; the toggle cycles auto → light → dark, stored in
  `localStorage` and applied by an inline script in `Base.astro` before first paint (no flash).
- **Fonts**: all self-hosted through `@fontsource`, no CDN. Newsreader (headings, name, summary),
  Inter (body), JetBrains Mono (dates, tags, role, top bar). The vertical label uses a Noto Serif JP
  subset cut by hand to the glyphs of 履歴書・職務経歴 (`src/assets/fonts`, 3 KB); any new Japanese
  text needs the full font.
- **Top bar** (screen only): a `scorsi@rirekisho:~/fr$ cat cv` prompt with a blinking vermilion
  cursor (steady under `prefers-reduced-motion`), then `[FR] EN`, the theme toggle `◐ auto` and a
  boxed `PDF ↓` button.
- **Sheet**: a paper card, max 1080 px. Vertical 履歴書・職務経歴 in the right margin (screen only,
  hidden below 900 px).
- **Header**: black-and-white photo 120×150, name in Newsreader 64 px, role in vermilion mono
  prefixed `> `; on the right a hanko-like seal with the initials (rounded vermilion square, slightly
  rotated, screen only) and the contact lines in mono. A solid ink rule underneath.
- **Summary** in Newsreader 22 px, 46ch max.
- **Sections** numbered `01 Expérience`, `02 Formation`, `03 Compétences`, `04 Langues`,
  `05 Intérêts`: number in vermilion mono, title in Newsreader.
- **Experience** (`TimelineItem.astro`): dates on the left (185 px, mono, duration in muted), content
  on the right (title Inter 600, company as a link, location muted, summary, vermilion « — » bullets,
  boxed mono `#tag`s). Dotted separators. A draft gets a « brouillon » badge. On mobile the dates move
  above.
- **Bottom**: skills / languages / interests in 3 columns (2 below 900 px, 1 below 600 px). Skills =
  vermilion uppercase mono label, items separated by « · ».
- **Footer**: `built with astro · nix build` and the build date.

### Print (PDF, A4)

- Margins 12/13 mm, always light. No top bar, seal, vertical label or footer; the "online version"
  QR code sits top right.
- Tighter sizes: body 9.2 pt, name 30 pt; the date column is 37 mm and never wraps.
- `break-inside: avoid` on entries, `break-after: avoid` on headings.
- **Every responsive rule is scoped to `@media screen`**, so none of it leaks into print. Keep it
  that way when adding breakpoints.

## Dependencies and Nix

- `nix/package.nix` builds `dist/` without the PDFs (printing needs a browser; CI runs `pnpm pdf`
  outside the sandbox, `.forgejo/workflows/build.yml`).
- After any change to `pnpm-lock.yaml`, refresh `pnpmDeps.hash`: set it to `""`, `nix build`, copy
  the hash from the error.
- pnpm 11 refuses packages published less than 24 h ago (`minimumReleaseAge`), and checks the whole
  lockfile before resolving anything. Don't relax the policy: wait, or pick the previous version.
- Dependency install scripts must be listed in `allowBuilds` (`pnpm-workspace.yaml`), otherwise
  `pnpm install` fails. `esbuild: false` on purpose: its binary comes from `@esbuild/<platform>`.

## Testing changes

`pnpm lint`, `pnpm build && pnpm pdf` and a look at both PDFs (two pages, nothing cut between
pages); `pnpm dev` for the screen layout at desktop, 900 px and 600 px, in both themes. Nix changes:
`nix build`, `nix flake check`, `nix fmt`.

## Git

Commits are SSH-signed via a plugged-in FIDO2 key; signing just needs a touch on the hardware key.
Creating commits (including signing) in this repo on behalf of the user is fine. Forgejo is the
source, GitHub a push mirror.
