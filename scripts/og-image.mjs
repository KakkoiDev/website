// Renders the share images, public/og.png (English) and public/og-ja.png
// (Japanese), 1200x630, with the site's own self-hosted fonts.
//
//   yarn build
//   node scripts/og-image.mjs
//   yarn build   # again, so out/ carries the new images
//
// It serves out/ on 127.0.0.1, reads the hero text, the stylesheet links and
// the <html> font-variable classes from the built / and /ja/ pages, renders a
// template page that exists only in memory, and screenshots it. Nothing is
// written but the two PNGs, which are committed. Rerun it whenever the hero
// text, the fonts or the cube change.
//
// Playwright is not a dependency of this repository; point at a copy:
//   PLAYWRIGHT_MODULE  package name, or path to its index.mjs (default "playwright")
//   CHROMIUM           Chromium binary to launch instead of Playwright's own
//   PORT               port for the local server (default: any free port)

import { createServer } from "node:http";
import { readFile, stat, writeFile } from "node:fs/promises";
import { extname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = join(root, "out");
const WIDTH = 1200;
const HEIGHT = 630;
const DOMAIN = "kakkoi.dev";

const targets = [
  { locale: "en", path: "/", file: "public/og.png" },
  { locale: "ja", path: "/ja/", file: "public/og-ja.png" },
];

// The hero on the site, scaled up about 2.2 times; the cube is the site's
// own .cube, stopped at one angle.
const css = `
html, body { margin: 0; }
body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; background: #fff; color: #000; line-height: normal; }
.og { display: flex; flex-direction: column; width: 100%; height: 100%; }
.og-hero { position: relative; flex: 1; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.og-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.cube.og-cube { --size: 290px; animation: none; transform: rotateX(-24deg) rotateY(38deg); }
.og-text { position: relative; display: flex; flex-direction: column; align-items: center; gap: 22px; text-align: center; white-space: nowrap; }
.og-domain { display: flex; align-items: center; justify-content: center; height: 96px; border-top: 1px solid #000; font: 500 26px var(--font-inter); letter-spacing: 0.02em; }
/* Letter-spacing also trails the last letter: pad the start by as much to stay centered. */
.en .og-name { font: 400 184px/0.9 var(--font-bebas); letter-spacing: 0.01em; }
.en .og-alt { font: 400 30px var(--font-noto-jp); letter-spacing: 0.3em; padding-left: 0.3em; }
.en .og-title { font: 500 34px var(--font-inter); }
.ja .og-name { font: 700 100px/1.25 var(--font-noto-jp); letter-spacing: 0.06em; padding-left: 0.06em; }
.ja .og-alt { font: 400 44px var(--font-bebas); letter-spacing: 0.06em; padding-left: 0.06em; }
.ja .og-title { font: 500 34px var(--font-noto-jp); }
`;

const escape = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function template({ locale, htmlClass, stylesheets, name, altName, title }) {
  const other = locale === "en" ? "ja" : "en";
  return `<!doctype html>
<html lang="${locale}" class="${escape(htmlClass)}">
<head>
<meta charset="utf-8">
${stylesheets.map((href) => `<link rel="stylesheet" href="${escape(href)}">`).join("\n")}
<style>${css}</style>
</head>
<body class="${locale}">
<div class="og">
  <div class="og-hero">
    <div class="scene og-scene"><div class="cube og-cube">${"<div></div>".repeat(6)}</div></div>
    <div class="og-text">
      <div class="og-name">${escape(name)}</div>
      <div lang="${other}" class="og-alt">${escape(altName)}</div>
      <div class="og-title">${escape(title)}</div>
    </div>
  </div>
  <div lang="en" class="og-domain">${DOMAIN}</div>
</div>
</body>
</html>`;
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

// out/ as GitHub Pages would serve it, at basePath, plus the in-memory templates.
function serve(basePath, templates) {
  const server = createServer(async (req, res) => {
    const { pathname } = new URL(req.url, "http://localhost");
    if (templates.has(pathname)) {
      res.writeHead(200, { "content-type": types[".html"] });
      return res.end(templates.get(pathname));
    }
    const path = decodeURIComponent(pathname.slice(basePath.length));
    let file = join(outDir, path);
    if (!pathname.startsWith(basePath) || relative(outDir, file).startsWith("..")) {
      res.writeHead(404);
      return res.end();
    }
    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      const body = await readFile(file);
      res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  return new Promise((done) =>
    server.listen(Number(process.env.PORT ?? 0), "127.0.0.1", () => done(server)),
  );
}

async function loadPlaywright() {
  const spec = process.env.PLAYWRIGHT_MODULE ?? "playwright";
  const url = isAbsolute(spec) || spec.startsWith(".") ? pathToFileURL(resolve(spec)).href : spec;
  const mod = await import(url);
  return mod.chromium ?? mod.default.chromium;
}

const index = await readFile(join(outDir, "index.html"), "utf8").catch(() => {
  throw new Error("out/index.html not found: run `yarn build` first");
});
// The stylesheet hrefs carry the base path the site was built with.
const basePath = index.match(/href="([^"]*)\/_next\/static\//)?.[1] ?? "";

const templates = new Map();
const server = await serve(basePath, templates);
const origin = `http://127.0.0.1:${server.address().port}`;
const chromium = await loadPlaywright();
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });

try {
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  for (const { locale, path, file } of targets) {
    await page.goto(`${origin}${basePath}${path}`);
    const data = await page.evaluate(() => {
      const hero = document.querySelector("#home");
      const text = (selector) => hero?.querySelector(selector)?.textContent.trim();
      return {
        htmlClass: document.documentElement.className,
        stylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) =>
          l.getAttribute("href"),
        ),
        name: text("h1"),
        altName: text("h1 + [lang]"),
        title: text("h1 ~ p"),
      };
    });
    for (const [key, value] of Object.entries(data)) {
      if (!value?.length) throw new Error(`${path}: no ${key} found in the built page`);
    }

    const templatePath = `/__og-${locale}.html`;
    templates.set(templatePath, template({ locale, ...data }));
    await page.goto(`${origin}${templatePath}`);

    // Fail rather than ship an image set in a fallback font.
    const problems = await page.evaluate(async () => {
      await document.fonts.ready;
      const style = getComputedStyle(document.documentElement);
      const loaded = new Set(
        [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, "")),
      );
      const missing = ["--font-bebas", "--font-inter", "--font-noto-jp"]
        .map((v) => style.getPropertyValue(v).split(",")[0].trim().replace(/['"]/g, ""))
        .filter((family) => !loaded.has(family))
        .map((family) => `font not loaded: ${family}`);
      // Every line must sit inside the image with a margin, unwrapped.
      const clipped = [...document.querySelectorAll(".og-text > *, .og-domain")]
        .filter((el) => {
          const range = document.createRange();
          range.selectNodeContents(el);
          const r = range.getBoundingClientRect();
          return r.left < 32 || r.right > innerWidth - 32 || r.top < 0 || r.bottom > innerHeight;
        })
        .map((el) => `outside the image: ${el.textContent}`);
      return [...missing, ...clipped];
    });
    if (problems.length) throw new Error(`${file}:\n  ${problems.join("\n  ")}`);

    await writeFile(join(root, file), await page.screenshot({ type: "png" }));
    console.log(`wrote ${file}`);
  }
} finally {
  await browser.close();
  server.close();
}
