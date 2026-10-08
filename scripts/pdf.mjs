// Prints each locale's page of the built site (dist/) to dist/rirekisho-<locale>.pdf with Chromium,
// so the PDF is the web page itself (its @media print rules), not a second layout to maintain.
//
//   pnpm build && pnpm pdf
//
// Chromium: $CHROMIUM_PATH if set (the Nix dev shell always sets it), else a browser installed by
// Playwright, else the system Chrome/Chromium.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { chromium } from "playwright-core";

const dist = resolve(process.argv[2] ?? "dist");
const base = (process.env.RIREKISHO_BASE ?? "/").replace(/\/?$/, "/");
const locales = (process.env.RIREKISHO_LOCALES ?? "fr,en").split(",").filter(Boolean);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

// The build's links include the base path; serve dist/ under it, like the real host would.
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (!path.startsWith(base)) return res.writeHead(404).end();
  let file = normalize(join(dist, path.slice(base.length)));
  if (!file.startsWith(dist)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});

function executablePath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
  ];
  // undefined: let Playwright look for its own installed browser.
  return candidates.find((p) => existsSync(p));
}

await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: executablePath() });

try {
  // Light theme whatever the machine prefers; print rules force it too, this keeps screen-only
  // colours out of anything Chromium renders before switching to print media.
  const page = await browser.newPage({ colorScheme: "light" });
  for (const locale of locales) {
    const url = `${origin}${base}${locale}/`;
    const response = await page.goto(url, { waitUntil: "networkidle" });
    if (!response?.ok()) throw new Error(`${url}: HTTP ${response?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    const out = join(dist, `rirekisho-${locale}.pdf`);
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log(`${out}`);
  }
} finally {
  await browser.close();
  server.close();
}
