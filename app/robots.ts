import type { MetadataRoute } from "next";

// Written to a file at build time for the static export.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kakkoi.dev/sitemap.xml",
  };
}
