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
- **Never on the site:** "full-stack", living in Japan, ProOne, client or
  partner names, the phone number.
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

1. Both languages, always. No string in a component.
2. Both languages keep the shared scale above, and Japanese keeps its
   phrase-based line breaks.
3. No third-party origins: the CSP in `lib/csp.ts` allows this origin only.
   Fonts go through `next/font`.
4. Exactly one `<h1>` (the name), an `<h2>` per section, links with
   accessible names, `rel="noopener noreferrer"` on `target="_blank"`.
5. Keep `lib/metadata.ts` (canonical, hreflang, Open Graph), the bilingual
   sitemap, and one root layout per language so `<html lang>` is right.
6. The page is a server component and needs no client JavaScript of its own.
   Keep it that way unless a feature truly needs it.
7. The site is a static export for GitHub Pages: no API routes, no server
   features, no `revalidate`. Internal links end in `/` (`/ja/`), because
   `trailingSlash` is on, and go through `next/link` so they pick up the
   base path when the site is served from a subfolder.

## Checking a change

```sh
yarn lint
yarn build                                   # writes out/
python3 -m http.server 3000 --directory out  # serves it like Pages
```

Then, in a real browser, on `/` and `/ja` at 390px and 1280px: no console
errors or CSP violations, no sideways scroll, the right `<html lang>`, the
language switch goes to the other page, no lone Japanese character at the end
of a line at 390px, and a still cube with reduced motion on.

Deployment is GitHub Pages; see the README.

## History

The October 2026 audit (`docs/AUDIT.md`) found a portfolio with a contact form.
The redesign then removed the portfolio, projects, experience and bio sections,
the contact form with its API and email, and the Three.js, video and toast
dependencies.
