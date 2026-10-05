# Design

The site as approved by the owner on 2026-10-03. Read this before changing how
kakkoi.dev looks or what it says.

## What the site is

A single white page that presents **Cyril Antoni (アントニ キリル)**. It is not a
portfolio and does not look for clients; visitors who want details go to
LinkedIn or GitHub. Top to bottom: a header (wordmark, language switch), a hero
with the name over a faint rotating wireframe cube, "What I do" (two lines),
Contact (three links), and a footer.

Two pages with the same structure: English at `/`, Japanese at `/ja`. `/ja` is
where the QR code on the business card (名刺) lands, so it is designed first
for a phone.

## Copy

Every visible string lives in `data/dictionary.ts`, in `en` and `ja`.
Contact links come from `data/social-links.ts`.

- **Name order is deliberate.** English contexts put the given name first:
  Cyril Antoni / キリル アントニ. Japanese contexts put the family name first:
  アントニ キリル / Antoni Cyril. Metadata follows the same rule.
- **Never on the site:** "full-stack", living in Japan, client or
  partner names, the phone number.
- **Now page exception (owner request, 2026-10-05):** mention employment at
  MeetsMore in Ginza, Tokyo, AI integration into ProOne, and support for
  other teams integrating AI into their features, in both languages.
- **Japanese line breaks:** Japanese strings are arrays of phrases. Each phrase
  renders as an inline-block (`.ph`), so lines break only between phrases and
  never end on a lone character.

## Visual system

Pure black on white: text `#000`, background `#fff`, muted text and link hover
`#555`, rules `1px solid #000`, cube lines `#00000024`. No accent color, no
gradients, no textures.

| Font (`next/font`, self-hosted) | Use |
| --- | --- |
| Bebas Neue 400 | English display: name, `<h2>`s, wordmark. The Latin name on `/ja`. |
| Inter 400/500/600 | English body and links; Latin text on `/ja` |
| Noto Sans JP 400/500/700 | All Japanese text. Japanese headings never use Bebas Neue. |

One centered column, 720px of content, gutters 16px on phones and 24px from
640px up. Every link is at least 44px tall.

Both languages share one scale (owner decision, after launch): every element
has the same size and spacing in English and Japanese. The only exception is
the name, because condensed Bebas Neue needs more pixels than Noto Sans JP to
read as the same size.

| Element | Both | `/` font | `/ja` font |
| --- | --- | --- | --- |
| Header height | 64px | | |
| Hero padding | 128px top, 136px bottom | | |
| `<h1>` (the name) | | Bebas, `clamp(56px, 9vw, 80px)`, line-height .9 | Noto 700, `clamp(34px, 5vw, 44px)`, letter-spacing .06em |
| Alternate name | | Noto 14px, letter-spacing .3em | Bebas 20px, letter-spacing .06em |
| Title | 16px, weight 500 | Inter | Noto |
| Section | 36px vertical padding, 1px top rule | | |
| `<h2>` | | Bebas 28px | Noto 700, 20px |
| What-I-do lines | 20px, 18px apart | Inter 600, line-height 1.4 | Noto 700, line-height 1.6 |
| Contact links | in a row, 28px apart, 16px | Inter | Inter |

The values are the `shared` and `styles` objects in `components/Home.tsx`.

**The cube** is pure CSS (`app/globals.css`): six bordered faces in a
`preserve-3d` box, turning once every 30s, behind the hero text, `aria-hidden`.
It is 420px from 600px wide up and 240px on phones, in both languages. It deliberately spills below the hero, behind the first rule, and its
layer spans the full viewport so it runs to the screen edge; `html` and `body`
clip horizontal overflow so it never widens the page. With
`prefers-reduced-motion` it keeps turning at a quarter of the speed (one turn
every 120s): the owner preferred that to a still cube.

## Rules

1. Both languages, always. No string in a component. Exceptions, by the
   owner's choice:
   - `/links` and `/now` are available in English and Japanese at the root
     and under `/ja/`. Home, Links and Now share `components/Navigation.tsx`:
     Now and Links are visible in both languages, and the language switch
     stays on the corresponding page. Now has no separate link in the Links
     page content.
   - `/nihongo` remains English only, on `components/SubPage.tsx`, with no
     hreflang and metadata from `englishPageMetadata()`. It is linked from
     the Japanese learning group on `/links` in either language.
   - `/card` (`components/Card.tsx`, `data/card.ts`) shows both languages on
     one page, like the 404: it is the digital 名刺 shown on a phone, so the
     reader may read either. `noindex`, not in the sitemap, not linked. It
     must fit a 390x844 screen without scrolling.
   - Text read from GitHub (the "More projects" group on `/links`, "Recently
     updated" on `/now`) is shown as written in each repo's Description, minus
     em-dashes. Fix wording on GitHub, not here.
2. Both languages keep the shared scale above, and Japanese keeps its
   phrase-based line breaks.
3. No third-party origins: the CSP in `lib/csp.ts` allows this origin only.
   Fonts go through `next/font`. The one exception is GoatCounter analytics,
   and only while a code is set in `data/analytics.ts`: then the CSP opens
   `https://CODE.goatcounter.com` for `connect-src` and `img-src`. With `null`
   the policy is unchanged.
4. Exactly one `<h1>` per page, an `<h2>` per section, links with
   accessible names, `rel="noopener noreferrer"` on `target="_blank"`.
5. Keep `lib/metadata.ts` (canonical, hreflang, Open Graph, the share images
   `/og.png` and `/og-ja.png`), the sitemap, and one root layout per language
   so `<html lang>` is right.
6. Pages are server components and need no client JavaScript of their own.
   QR codes are drawn at build time (`lib/qr.ts`, error correction M) as inline
   SVG. `public/count.js` is the one optional script, loaded only while
   analytics is on.
7. The site is a static export for GitHub Pages: no API routes, no server
   features, no `revalidate`. Internal links end in `/` (`/ja/`), because
   `trailingSlash` is on, and go through `next/link` so they pick up the
   base path when the site is served from a subfolder. Links to files in
   `public/` (the vCard, `count.js`) are plain `<a>`/`<script>` whose URL goes
   through `withBasePath()` in `lib/base-path.ts`.
8. The pages that read GitHub at build time (`/links`, `/now`) are
   `force-static`, and `lib/github.ts` fetches with `cache: "no-store"` and
   never throws: if GitHub cannot be read, the build still succeeds with the
   hand-written content only.

## Checking a change

```sh
yarn lint
yarn build                                   # writes out/
python3 -m http.server 3000 --directory out  # serves it like Pages
```

Then, in a real browser, on `/`, `/ja/`, `/links/`, `/ja/links/`, `/now/`, `/ja/now/`, `/nihongo/` and
`/card/` at 390px and 1280px: no console errors or CSP violations, no sideways
scroll, the right `<html lang>`, the language switch goes to the other page, no
lone Japanese character at the end of a line at 390px, the cube turning (slowly
with reduced motion on), and the `/card` QR decoding to
`https://kakkoi.dev/ja/?ref=phone`.

To test the GitHub fallback, point `GITHUB_API_URL` at a host that does not
answer (`GITHUB_API_URL=http://127.0.0.1:9 yarn build`): the build must pass,
`/links` shows the curated list and `/now` hides its list.

Deployment is GitHub Pages; see the README.

## History

The October 2026 audit (`docs/AUDIT.md`) found a portfolio with a contact form.
The redesign then removed the portfolio, projects, experience and bio sections,
the contact form with its API and email, and the Three.js, video and toast
dependencies.
