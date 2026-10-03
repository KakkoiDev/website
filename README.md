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

GitHub Pages, from `.github/workflows/pages.yml`: every push to `main` runs
`yarn lint` and `yarn build` (a static export to `out/`, Node 22) and publishes
it. The workflow also reruns on 1 January so the footer year rolls over.
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

Print-ready files for the 名刺 are in `docs/business-card/`. Its QR code points
to `https://kakkoi.dev/ja`.

## Third Party Services

Calendly booking URL: https://calendly.com/kakkoidev/15min
