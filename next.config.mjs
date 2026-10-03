/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages: `next build` writes the site to out/.
  // Pages cannot send custom headers, so the CSP lives in lib/csp.ts.
  output: "export",
  // Emit ja/index.html rather than ja.html next to a ja/ folder of RSC
  // payloads: Pages answers /ja with /ja/ and needs an index.html there.
  trailingSlash: true,
  experimental: {
    // app/global-not-found.tsx: the 404 for an app with one root layout per language
    globalNotFound: true,
  },
};

export default nextConfig;
