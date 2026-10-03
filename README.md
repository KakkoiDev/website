# KakkoiDev

`yarn` install packages.

`yarn dev` start website dev server.

`yarn build` production build; `yarn lint` lint.

`yarn email` start email template dev server.

## Environment

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key for the contact form |
| `EMAIL` | Inbox that receives contact messages |
| `EMAIL_WITH_SENDER_NAME` | Verified sender, e.g. `KakkoiDev <hello@kakkoi.dev>` |

Without them the contact API answers 500 and logs which is missing.

## Content

- `data/portfolio-projects.ts`: client work, with video
- `data/projects.ts`: independent products and open-source tools
- `data/social-links.ts`: social icons

## Security

Security headers, including the Content-Security-Policy, are set in
`next.config.mjs`. Any new third-party origin must be added there. See
`docs/AUDIT.md` for the October 2026 audit.

## Third Party Services

Email sending: https://resend.com

Calendly booking URL: https://calendly.com/kakkoidev/15min
