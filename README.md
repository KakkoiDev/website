# KakkoiDev

`yarn` install packages.

`yarn dev` start website dev server.

`yarn build` production build; `yarn lint` lint.

## Content

One page in English (`/`) and Japanese (`/ja`), both rendered by the server
component `components/Home.tsx`.

- `data/dictionary.ts`: every visible string and the page metadata, in `en` and `ja`
- `data/social-links.ts`: the contact email and profile links

See `docs/DESIGN.md` for the approved design and the rules that keep both
languages in step.

## Deployment

Vercel deploys `main` to production and every pull request to a preview,
building with Node 22 (`engines` in `package.json`). The production deployment
must have both `kakkoi.dev` and `www.kakkoi.dev` assigned: the business card's
QR code opens `https://kakkoi.dev/ja`.

## Security

Security headers, including the Content-Security-Policy, are set in
`next.config.mjs`. Any new third-party origin must be added there. See
`docs/AUDIT.md` for the October 2026 audit.

## Business card

Print-ready files for the 名刺 are in `docs/business-card/`. Its QR code points
to `https://kakkoi.dev/ja`.

## Third Party Services

Calendly booking URL: https://calendly.com/kakkoidev/15min
