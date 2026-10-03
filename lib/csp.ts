import { analyticsOrigin } from "@/lib/analytics";

const isDev = process.env.NODE_ENV !== "production";

// With analytics on (data/analytics.ts), public/count.js sends one request
// to GoatCounter: a beacon (connect-src), or an image where sendBeacon is
// missing (img-src). Off, the policy is unchanged.
const analytics = analyticsOrigin ? ` ${analyticsOrigin}` : "";

// GitHub Pages cannot send custom response headers, so the policy ships as a
// <meta http-equiv> tag in each root layout. A meta policy cannot carry
// frame-ancestors; everything else applies as it would from a header. There is
// no upgrade-insecure-requests: Pages' Enforce HTTPS already serves everything
// over HTTPS, and before its certificate exists the directive breaks every
// asset of a page opened over http.
// Next.js inlines its bootstrap scripts, hence 'unsafe-inline'. Fonts are
// self-hosted by next/font, so nothing loads from another origin, and the
// only request to one is the analytics count above.
export const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data:${analytics}`,
  "font-src 'self'",
  `connect-src 'self'${analytics}${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");
