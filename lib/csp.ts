const isDev = process.env.NODE_ENV !== "production";

// GitHub Pages cannot send custom response headers, so the policy ships as a
// <meta http-equiv> tag in each root layout. A meta policy cannot carry
// frame-ancestors; everything else applies as it would from a header.
// Next.js inlines its bootstrap scripts, hence 'unsafe-inline'. Fonts are
// self-hosted by next/font, so nothing loads from another origin.
export const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");
