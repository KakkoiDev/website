import type { MetadataRoute } from "next";

const languages = { en: "https://kakkoi.dev", ja: "https://kakkoi.dev/ja" };

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(languages).map((url) => ({
    url,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
