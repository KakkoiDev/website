# KakkoiDev

`yarn` install packages.

`yarn dev` start website dev server.

`yarn build` production build; `yarn lint` lint.

## Content

Home, Now and Links are available in English (`/`, `/now/`, `/links/`) and
Japanese (`/ja/`, `/ja/now/`, `/ja/links/`). Each pair shares a server
component and navigation with a page-preserving language switch.

- `data/dictionary.ts`: every visible string and the page metadata, in `en` and `ja`
- `data/social-links.ts`: the contact email and profile links
- `data/links.ts`: the curated projects on `/links` and `/ja/links`; link the
  live site when there is one, the repository otherwise; set `repo` to
  "Owner/name" when there is one
- `data/now.ts`: the English and Japanese `/now` text; rewrite both versions, and its "Updated" line, when your
  focus changes (the "Recently updated" list below it builds itself)
- `data/nihongo.ts`: the `/nihongo` hub of Japanese learning tools
- `data/card.ts`: the `/card` digital 名刺 (a QR code to show on a phone)
- `public/cyril-antoni.vcf`: the "Add to contacts" card (keep CRLF line
  endings; never add a phone number)
- `data/analytics.ts`: the GoatCounter code, `null` = analytics off

### Adding a project to /links without editing code

On GitHub, open the repo, then the gear next to **About**: add the topic
`kakkoi-links`, write a one-line Description, and set Website if the project
has a live site. At the next build (any push to `main`, the weekly Monday run,
or Actions → Deploy to GitHub Pages → Run workflow) it appears in a "More
projects" group on `/links`. Only public KakkoiDev and KakkoiSchool repos that
are not forks or archived, and have a description. A repo already in
`data/links.ts` is never added twice; add it there to choose its wording or
group.

### Analytics (off by default)

1. Create a free site at goatcounter.com; its code is the `CODE` in
   `CODE.goatcounter.com`.
2. Set `goatCounterCode` in `data/analytics.ts` to that code and push.
3. Both root layouts then load `/count.js`, one pageview per page load, with
   the query string, so business card scans (`?ref=card`) and `/card` scans
   (`?ref=phone`) show as campaigns. No cookies. The CSP opens only that
   origin. Set it back to `null` to turn it off.

See `docs/DESIGN.md` for the approved design and the rules that keep both
languages in step.

## Deployment

GitHub Pages, from `.github/workflows/pages.yml`: every push to `main` runs
`yarn lint` and `yarn build` (a static export to `out/`, Node 22) and publishes
it. It also runs every Monday, so `/links` and `/now` pick up GitHub changes,
and on 1 January so the footer year rolls over. The build gets the workflow's
read-only `GITHUB_TOKEN` for the GitHub API; if GitHub cannot be read the build
still succeeds and logs a warning. GitHub pauses scheduled runs after 60 days
without repository activity (re-enable them in the Actions tab).
The build asks Pages where it serves the site and prefixes every path with
that (`basePath`): `/website` at `kakkoidev.github.io/website/`, nothing once
the custom domain is set. After changing the domain, rerun the workflow
(Actions → Deploy to GitHub Pages → Run workflow). The business card's QR code
opens `https://kakkoi.dev/ja`, which Pages answers with `/ja/`.

Repository settings: **Pages → Source: GitHub Actions**, custom domain
`kakkoi.dev`, **Enforce HTTPS** on.

## Security

GitHub Pages cannot send custom headers, so the Content-Security-Policy ships
as a `<meta>` tag built from `lib/csp.ts`. Any new third-party origin must be
added there. See
`docs/AUDIT.md` for the October 2026 audit.

## Business card

Print-ready files for the 名刺 are in `docs/business-card/`: send
`business-card-print.pdf` (2 pages of 97 x 61 mm: 91 x 55 trim plus 3 mm
bleed). Its QR code points to `https://kakkoi.dev/ja/?ref=card` (error
correction M, 29 mm on the back); cards printed earlier point to
`https://kakkoi.dev/ja` and keep working. Scan a printed proof before ordering.

## Share images

`public/og.png` and `public/og-ja.png` (1200 x 630) are the link previews.
After changing the hero text, fonts or cube, regenerate and commit them:

```sh
yarn build
PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs CHROMIUM=/path/to/chrome node scripts/og-image.mjs
yarn build
```

## Third Party Services

Calendly booking URL: https://calendly.com/kakkoidev/15min
