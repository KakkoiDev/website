# Audit and refresh — October 2026

What was found on kakkoi.dev, what is already fixed on this branch, what still
needs the owner, and the brief for the redesign and the Japanese business cards.

## Fixed on this branch

### Security

| Issue | Severity | Fix |
| --- | --- | --- |
| Next.js 14.1.0 had 30+ published advisories, including **unauthenticated remote code execution in the image optimizer** (which this site uses for `cdn.kakkoi.dev` images), a middleware auth bypass and cache poisoning. Next 14 is end-of-life and the RCE fix is not backported to it. | Critical | Upgraded to Next 16.3.8, React 19.3. `yarn audit` went from 276 findings (6 critical, 160 high) to 3 high, all in `braces`, a build-time file-glob dependency of Tailwind/ESLint that has no patched release and never sees visitor input. |
| The contact API sent a "thank you" email **to whatever address was typed in the form**, quoting the visitor's message. Anyone could make `kakkoi.dev` send arbitrary content to arbitrary people: spam, phishing, and a ruined sender reputation for the domain. | High | The confirmation email is gone. Only the owner is emailed, with `Reply-To` set to the visitor, so replying works the same. |
| Both email templates put the visitor's message into the email via `dangerouslySetInnerHTML`, so HTML (links, fake buttons, images) was rendered as-is. | High | Rendered as plain text with `white-space: pre-wrap`. |
| No validation on the server: any JSON was accepted, any length, any type. | Medium | Server validates type, email format, 254-char email, 5000-char message. |
| No abuse protection. | Medium | Same-origin check, hidden honeypot field, best-effort per-IP rate limit (3 per 10 min). See "Still open" for a hard limit. |
| The API echoed the request body back on success and the raw provider error object on failure, with status 200 either way. | Low | Returns `{ ok: true }` or a generic message with a real status code; details go to server logs only. |
| No security headers. | Medium | `next.config.mjs` sets a Content-Security-Policy, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP, and drops `X-Powered-By`. |
| `target="_blank"` links without `rel`. | Low | `rel="noopener noreferrer"` everywhere. |
| The client logged the visitor's email and message to the browser console. | Low | Removed. |

The git history was scanned for committed keys and `.env` files: none found.

### Bugs and quality

- `typeof imageBottom !== undefined` was always true (compared a string with
  `undefined`), so the About reveal could fire on a missing element.
- Windows icon was titled "Android"; typos (`reacking`, `archivements`,
  `Heiht`, `Sevices`); email footers hard-coded © 2024.
- The page had no `<h1>` and no `<h2>`s; all headings were `<div>`s. Section
  titles are now real headings.
- Icon-only links had no accessible name; the video play control and the toast
  close were clickable `<div>`s. Now `aria-label`led links and `<button>`s.
  Form fields have labels and `autocomplete`.
- SEO: canonical URL, Open Graph and Twitter cards, `robots.txt`, `sitemap.xml`.
- ESLint migrated to the flat config Next 16 requires (`yarn lint`).

### Portfolio

A **Recent Projects** section lists nine independent products and open-source
tools, each described from its own README: Echo, Minihongo, Schness, Bible
Reader, KakkoiSchool, git-dispatch, the tmux agent tools, tinyagent and
webmods. The content lives in `data/projects.ts`; edit or reorder there.

The bio and a new **Experience** section follow the June 2025 resume plus the
current MeetsMore work (AI features in ProOne, promoting AI feature
development). Partner and client names under NDA are left out on purpose, and
the phone number from the resume is not published. Content: `data/experience.ts`
and the `about` block of `data/dictionary.ts`.

### Japanese version

`/ja` is the full site in Japanese, with an EN / 日本語 switch in the nav,
`hreflang` alternates, a bilingual sitemap and a bilingual 404. Each language
has its own root layout (`app/(en)`, `app/(ja)`) so the served `<html lang>`
is right, and both render `components/Home.tsx`. Every visible string is in
`data/dictionary.ts`; translatable data fields are `{ en, ja }` objects. Japanese
headings use Noto Sans JP, because Bebas Neue has no Japanese glyphs. The
About video is English-only, and its Japanese alt text says so.

## Still open: needs the owner

1. **Review the Japanese copy** in `data/dictionary.ts`, `data/experience.ts`,
   `data/portfolio-projects.ts` and `data/projects.ts`, especially how ProOne and
   the MeetsMore work are worded, before it goes on a card.
2. **Hard rate limit.** The in-memory limiter resets on each serverless cold
   start. For a real limit, add a Vercel Firewall rate-limit rule on
   `/api/email/send`, or Cloudflare Turnstile on the form (then add
   `https://challenges.cloudflare.com` to `script-src` and `frame-src` in the CSP).
3. **Email domain auth.** Check SPF, DKIM and DMARC for the sending domain in
   Resend. Rotate the Resend key if it was ever shared outside the host's env
   settings.
4. **HSTS preload** was deliberately left off: `includeSubDomains; preload`
   binds every `*.kakkoi.dev` subdomain to HTTPS for years. Add it once every
   subdomain is confirmed HTTPS-only.
5. The README lists a Calendly link the site no longer shows; either put it back
   on the contact section or drop it.

## Brief for the redesign

Technical constraints a redesign must keep, or knowingly change:

- **CSP.** Any new third-party origin (fonts, analytics, embeds, CAPTCHA) must
  be added to the policy in `next.config.mjs`, or the browser will block it.
  Fonts load through `next/font`, which self-hosts them, so they need no change.
- **Contact form.** Keep the hidden `website` honeypot input and the field
  names `email` and `message`; the API depends on them.
- **Content is data.** `data/portfolio-projects.ts` (client work with video),
  `data/projects.ts` (independent work), `data/experience.ts`,
  `data/social-links.ts`, and every UI string in `data/dictionary.ts`, in both
  English and Japanese. Rendering is in `components/Home.tsx`, shared by `/`
  and `/ja`. Keep new copy in the dictionary so the two languages cannot drift.

Opportunities the redesign should take:

- **Performance.** The whole page is one client component. Splitting the
  static sections into server components and keeping only the interactive
  parts on the client would cut the JavaScript a lot. The Three.js wireframe
  cube pulls in Three.js and react-three-fiber for one decorative element.
  `react-player` only plays plain MP4s, which a native `<video>` handles.
- **Motion.** Videos autoplay on scroll and there is a cursor halo and a
  reveal animation; none of it respects `prefers-reduced-motion`.
- **Accessibility.** On devices with a mouse, the portfolio details are hidden
  until hover, which a keyboard user cannot trigger.
- **Contact flow.** The visitor no longer gets a confirmation email; the
  success toast says "I'll get back to you within 2 business days" instead.
- **Japanese typography.** The Japanese page reuses the English layout with
  Noto Sans JP. Wide letter-spacing and the very large hero sizes were tuned for
  Bebas Neue; a Japanese-specific type scale would read better.

## Brief for the Japanese business cards (名刺)

The card and the site must say the same thing, so settle these first:

| Field | Value | Status |
| --- | --- | --- |
| 屋号 (trade name) | KakkoiDev | |
| 氏名 (name) | アントニ　キリル / ANTONI Cyril | Confirmed (family name first) |
| 肩書 (title) | e.g. フルスタックWebエンジニア | To choose; a personal card should not borrow the MeetsMore job title without the company's OK |
| Email | contact@kakkoi.dev | From the resume |
| Web | kakkoi.dev/ja | Live once this branch is deployed |
| QR code | https://kakkoi.dev/ja | |
| SNS | GitHub, LinkedIn | |
| Phone | | The resume has one; decide whether it goes on the card |

Print conventions: Japanese standard size 91 × 55 mm, 3 mm bleed, text at least
3 mm inside the trim, CMYK, 300 dpi or vector, Japanese fonts embedded or
outlined (for example Noto Sans JP or BIZ UDPGothic). Common layout: Japanese
on the front, English on the back. A horizontal (横書き) layout suits a tech
business and fits the URL and email without wrapping.
