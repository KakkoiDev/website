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

## Still open: needs the owner

1. **Bio is out of date.** It says "frontend web developer ... since 2018" and
   the client work shown stops at TheseusAI. The recent public work is mostly
   AI-agent tooling and Japanese-learning products. Decide on the headline and
   whether to add current or recent employment.
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
  `data/projects.ts` (independent work), `data/social-links.ts`. Rendering
  is all in `app/(ui)/page.tsx`.

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
- **Japanese version.** See below: the business card will point Japanese
  readers here, and the site is English-only. A `/ja` route (or a locale
  switch like Schness's EN / 日本) belongs in the redesign.

## Brief for the Japanese business cards (名刺)

The card and the site must say the same thing, so settle these first:

| Field | Proposed | Needs confirming |
| --- | --- | --- |
| 屋号 (trade name) | KakkoiDev | |
| 氏名 (name) | Latin name plus katakana reading | The exact katakana and name order |
| 肩書 (title) | e.g. Webアプリケーションエンジニア / フロントエンドエンジニア | Which one matches the new bio |
| Email | | A public address (not the private form inbox) |
| Web | kakkoi.dev | A Japanese landing page (`/ja`) for the QR code |
| QR code | kakkoi.dev/ja | Needs the `/ja` page to exist first |
| SNS | GitHub, LinkedIn | |
| Phone, address | | Optional; many freelancers omit them |

Print conventions: Japanese standard size 91 × 55 mm, 3 mm bleed, text at least
3 mm inside the trim, CMYK, 300 dpi or vector, Japanese fonts embedded or
outlined (for example Noto Sans JP or BIZ UDPGothic). Common layout: Japanese
on the front, English on the back. A horizontal (横書き) layout suits a tech
business and fits the URL and email without wrapping.
