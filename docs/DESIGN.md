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

| Element | `/` | `/ja` |
| --- | --- | --- |
| Header height | 64px | 56px |
| Hero padding | 160px top, 170px bottom | 110px top, 120px bottom |
| `<h1>` (the name) | Bebas, `clamp(64px, 10vw, 104px)`, line-height .9 | Noto 700, 34px, letter-spacing .06em |
| Alternate name | Noto 14px, letter-spacing .3em | Bebas 22px, letter-spacing .06em |
| Title | Inter 500, 17px | Noto 500, 15px |
| Section | 40px vertical padding, 1px top rule | 32px, same rule |
| `<h2>` | Bebas 32px, letter-spacing .02em | Noto 700, 18px |
| What-I-do lines | Inter 600, 22px, 20px apart | Noto 700, 18px, line-height 1.6, 18px apart |
| Contact links | in a row, 28px apart, 16px | stacked, 15px |

The per-language values are the `styles` map in `components/Home.tsx`.

**The cube** is pure CSS (`app/globals.css`): six bordered faces in a
`preserve-3d` box, turning once every 30s, behind the hero text, `aria-hidden`.
It is 420px on the English page from 600px wide up, and 240px on phones and on
`/ja`. It deliberately spills below the hero, behind the first rule; the hero
clips it horizontally so it can never widen the page. With
`prefers-reduced-motion` it stands still at a fixed angle.

## Rules

1. Both languages, always. No string in a component.
2. Japanese keeps its own type scale and phrase-based line breaks.
3. No third-party origins: the CSP in `next.config.mjs` allows this origin
   only. Fonts go through `next/font`.
4. Exactly one `<h1>` (the name), an `<h2>` per section, links with
   accessible names, `rel="noopener noreferrer"` on `target="_blank"`.
5. Keep `lib/metadata.ts` (canonical, hreflang, Open Graph), the bilingual
   sitemap, and one root layout per language so `<html lang>` is right.
6. The page is a server component and needs no client JavaScript of its own.
   Keep it that way unless a feature truly needs it.

## Checking a change

```sh
yarn lint
yarn build && yarn start
```

Then, in a real browser, on `/` and `/ja` at 390px and 1280px: no console
errors or CSP violations, no sideways scroll, the right `<html lang>`, the
language switch goes to the other page, no lone Japanese character at the end
of a line at 390px, and a still cube with reduced motion on.

`next start` keeps serving the previous build until it is restarted. Vercel
can refuse to deploy commits whose author is not on the Vercel team, which
looks like an instant, log-less build failure; squash-merging through GitHub
attributes the commit to the owner.

## History

The October 2026 audit (`docs/AUDIT.md`) found a portfolio with a contact form.
The redesign then removed the portfolio, projects, experience and bio sections,
the contact form with its API and email, and the Three.js, video and toast
dependencies.
