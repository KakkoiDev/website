import type { MetadataRoute } from "next";

// Written to a file at build time for the static export.
export const dynamic = "force-static";

const languages = { en: "https://kakkoi.dev/", ja: "https://kakkoi.dev/ja/" };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.values(languages).map((url) => ({
      url,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages },
    })),
    ...(["links", "now"] as const).flatMap((page) => {
      const languages = { en: `https://kakkoi.dev/${page}/`, ja: `https://kakkoi.dev/ja/${page}/` };
      return Object.values(languages).map((url) => ({
        url,
        changeFrequency: page === "now" ? "weekly" as const : "monthly" as const,
        priority: page === "now" ? 0.6 : 0.8,
        alternates: { languages },
      }));
    }),
    { url: "https://kakkoi.dev/nihongo/", changeFrequency: "monthly", priority: 0.8 },
  ];
}
