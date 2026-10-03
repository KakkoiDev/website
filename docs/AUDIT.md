# Audit and refresh — October 2026

> **Superseded in part.** The redesign that followed (see `DESIGN.md`) removed
> the contact form and its API, the portfolio, projects and experience sections,
> and the Three.js and video dependencies. The security fixes below that concern
> those parts no longer apply. The framework upgrade, the security headers,
> the Japanese version and the business card brief still do.

What was found on kakkoi.dev, what is already fixed on this branch, what still
needs the owner, and the brief for the redesign and the Japanese business cards.

## Fixed in the October 2026 audit

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

1. **HSTS preload** was deliberately left off: `includeSubDomains; preload`
   binds every `*.kakkoi.dev` subdomain to HTTPS for years. Add it once every
   subdomain is confirmed HTTPS-only.

## Business card (名刺)

Designed with the redesign. Print files are in [`business-card/`](business-card/):
send `business-card-print.pdf` (2 pages, 91 × 55 mm trim plus 3 mm bleed, fonts
embedded) and ask for K-only output so the small type and QR stay sharp. The
front reads アントニ キリル / Antoni Cyril / contact@kakkoi.dev; the back is a
QR code that decodes to `https://kakkoi.dev/ja`, so `/ja` must be live before
the cards are handed out. `front.html` and `back.html` are the editable sources.
