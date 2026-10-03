import type { MetadataRoute } from "next";

// Written to a file at build time for the static export.
export const dynamic = "force-static";

const languages = { en: "https://kakkoi.dev/", ja: "https://kakkoi.dev/ja/" };

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(languages).map((url) => ({
    url,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
