# Design handoff: kakkoi.dev redesign

For the agent redesigning this site. Read this first, then `docs/AUDIT.md` for
the security and content history behind it. Everything here is true of `main`
as of October 2026.

## Who and what this is for

kakkoi.dev is the portfolio of **Cyril Antoni (アントニ キリル)**, trading as
**KakkoiDev**. Cyril is a full-stack web engineer (Next.js, TypeScript, React
Native) and Senior Software Engineer at MeetsMore in Japan, where he builds AI
features into the ProOne platform and promotes AI feature development across
the company. He also ships his own products and open-source tools, many of them
for learning Japanese or for working with AI coding agents.

Two audiences, two languages:

- **English, `/`**: international clients, recruiters, developers.
- **Japanese, `/ja`**: Japanese contacts. This page is the target of the QR
  code on Cyril's **Japanese business cards (名刺)**, so it is often the first
  thing someone sees after meeting him in person, on a phone.

The redesign and the business card should look like one identity. If you
design the card too, the brief is at the end of `docs/AUDIT.md`.

## What the site has today

One long page, the same in both languages:

| Section | id | Content source |
| --- | --- | --- |
| Nav: logo, section links, language switch, Contact CTA | | `data/dictionary.ts` → `nav` |
| Hero: "KakkoiDev Studio / Web & App Development", wireframe cube | `#home` | `hero` |
| About: photo, bio, languages, achievements, what I do, intro video | `#about` | `about` |
| Experience: 7 roles, 2017 to now | `#experience` | `data/experience.ts` |
| Portfolio: 4 client projects with looping video | `#portfolio` | `data/portfolio-projects.ts` |
| Recent Projects: 9 independent products and tools | `#projects` | `data/projects.ts` |
| Contact: social icons, email + message form | `#contact` | `contact`, `data/social-links.ts` |
| Footer | | |

Current visual language, if you want to keep any of it: black on white, a
dotted background (`.bg-dotted`), **Bebas Neue** for display type, **Inter**
for body, **Noto Sans JP** for all Japanese text, a CTA whose fill inverts with
a circular wipe (`.cta`), a cursor halo with `mix-blend-mode: difference`, and a
slowly rotating Three.js wireframe cube in the hero. Nothing about the look is
sacred; the owner asked for a redesign.

## Where things live

| Path | What |
| --- | --- |
| `components/Home.tsx` | The whole page, one client component used by both languages |
| `app/(en)/layout.tsx`, `app/(ja)/layout.tsx` | One root layout per language (sets `<html lang>`, body font, metadata) |
| `app/(en)/page.tsx`, `app/(ja)/ja/page.tsx` | Render `<Home locale="en" />` / `<Home locale="ja" />` |
| `app/global-not-found.tsx` | Bilingual 404 (experimental Next flag, needed with two root layouts) |
| `app/globals.css`, `tailwind.config.ts` | Tailwind 3 plus the custom effects listed above |
| `lib/fonts.ts` | All `next/font` instances |
| `lib/metadata.ts` | Title, description, Open Graph, canonical and hreflang per language |
| `data/dictionary.ts` | **Every UI string and the bio**, in `en` and `ja` |
| `data/*.ts` | Content; translatable fields are `{ en, ja }` objects |
| `ui/Icon.tsx` | Technology and social icons (Iconify via Tailwind classes) |
| `app/api/email/send/route.ts` | Contact form endpoint (Resend) |
| `emails/ContactEmail.tsx` | The email the owner receives |
| `public/cyril.jpg` | Portrait (also the Open Graph image) |

Media on the CDN: `https://cdn.kakkoi.dev/` holds the portfolio videos and their
poster images (`portfolio-*.mp4` / `.png`), the intro video
`how-to-make-a-website.mp4` and its thumbnail, and `email-logo.png`.

## Rules the redesign must keep

These are load-bearing. Change them only on purpose and say so in the PR.

1. **Both languages, always.** No user-visible string goes into a component.
   Add it to `data/dictionary.ts` (or a `{ en, ja }` data field) in both
   languages. A section that exists in one language exists in the other.
2. **Japanese is not English with different words.** Bebas Neue has no Japanese
   glyphs; Japanese headings currently use Noto Sans JP bold. Wide
   letter-spacing and the giant English hero sizes do not suit Japanese; give
   `/ja` its own type scale. Check that no Japanese line breaks leave a single
   character alone (the hero once broke 「アプリ」 as 「アプ / リ」 at 390px).
3. **Content-Security-Policy.** `next.config.mjs` allows scripts, styles and
   fonts only from this origin, and images and media only from this origin and
   `cdn.kakkoi.dev`. Any new third-party origin (Google Fonts CDN, analytics,
   embeds, Lottie or Spline hosts, a CAPTCHA) is blocked until it is added
   there. Prefer self-hosting: `next/font` already self-hosts fonts.
4. **Contact form contract.** The API expects JSON `{ email, message, website }`
   from the same origin. `website` is a hidden honeypot that people never see
   or fill in; keep it hidden from sight and from assistive tech, and keep it
   in the payload. Limits: email 254 chars, message 5000.
5. **No confirmation email to visitors.** It was removed because it let anyone
   send mail from the domain. The success message promises a reply within 2
   business days instead; keep that promise visible.
6. **What must not appear on the site:** the phone number, the names of
   clients and partners under NDA (only what is already in `data/` is cleared),
   and the visitor's email anywhere in client-side logs.
7. **Semantics and accessibility.** One `<h1>`, an `<h2>` per section, real
   `<button>`s and links with accessible names, `rel="noopener noreferrer"` on
   `target="_blank"`. These were all fixed in the audit; do not regress them.
8. **SEO plumbing.** Keep `lib/metadata.ts` (canonical, hreflang, OG), the
   sitemap with both languages, and the per-language root layouts.

## What the redesign should improve

Ranked by how much the owner gains:

1. **First impression on a phone in Japanese.** The card's QR code lands on
   `/ja` on a phone. That first screen should say who Cyril is, what he does
   and how to reach him, in Japanese, without scrolling.
2. **Current story first.** The bio now leads with AI work at MeetsMore, but
   the page still opens on a generic "Web & App Development" hero and leads
   into client work from 2021–2024. Surface the current role and the AI work.
3. **Performance.** The page is one large client component. Make static
   sections server components and keep only the interactive bits on the
   client. Three.js and react-three-fiber are loaded for one decorative cube;
   `react-player` only ever plays plain MP4s, which `<video>` handles natively.
4. **Motion.** Videos autoplay on scroll and there is a cursor halo and a
   reveal animation; none of it honours `prefers-reduced-motion`.
5. **Hover-only content.** On devices with a mouse, portfolio details are
   hidden until hover, so keyboard users cannot reach them.
6. **Projects need visuals.** Recent Projects is text-only cards. Several have
   live sites (Echo, Minihongo, Schness, Bible Reader, KakkoiSchool) that could
   be screenshotted.

## Running and checking it

```sh
yarn                 # Node 22 (see "engines" in package.json)
yarn dev             # http://localhost:3000 and /ja
yarn lint
yarn build && yarn start
```

The contact form needs `RESEND_API_KEY`, `EMAIL` and `EMAIL_WITH_SENDER_NAME`;
without them it answers 500, which is fine for layout work.

Before opening a PR, check in a real browser, at 390px and 1280px, on both
`/` and `/ja`:

- the console shows no `Content Security Policy` violations and no errors;
- the page never scrolls sideways;
- `<html lang>` is `en` on `/` and `ja` on `/ja`, and the language switch
  goes to the other page;
- the contact form shows its validation and toast messages in the page's
  language.

Two traps from the last round of checks: the page sets `scroll-behavior:
smooth`, so screenshots taken right after a programmatic scroll catch it
mid-flight (override it with `html { scroll-behavior: auto }` in the test);
and `next start` keeps serving the previous build until it is restarted.

## Deployment

Vercel deploys `main` to production and every PR to a preview. Vercel can
refuse to deploy a commit whose author is not a member of the Vercel team (the
Hobby plan does this). The refusal is instant and has no build log, so it looks
like a broken build. That is the likely reason the agent-authored audit PR
showed a failed preview. Squash-merging through GitHub attributes the result to
the owner who merges it.

## Open questions for the owner

- Should the Japanese business card and the site share the dotted, black and
  white identity, or is the card the moment to set a new one?
- Keep the "KakkoiDev Studio" framing (a studio for hire), or present it as
  Cyril's personal brand?
- Keep the intro video? It is English-only.
