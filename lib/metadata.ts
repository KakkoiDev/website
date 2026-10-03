import type { Metadata } from "next";
import { dictionary } from "@/data";
import { Locale } from "@/type";

const SITE_URL = "https://kakkoi.dev";
const PATHS: Record<Locale, string> = { en: "/", ja: "/ja/" };

// The share previews, drawn by scripts/og-image.mjs at this size.
const SHARE_IMAGES: Record<Locale, string> = { en: "/og.png", ja: "/og-ja.png" };

export function shareImage(locale: Locale) {
  const { name, title } = dictionary[locale].hero;
  return {
    url: SHARE_IMAGES[locale],
    width: 1200,
    height: 630,
    alt: `${name} | ${[title].flat().join("")}`,
  };
}

export function localeMetadata(locale: Locale): Metadata {
  const { title, description } = dictionary[locale].meta;
  const image = shareImage(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: PATHS[locale],
      languages: { en: PATHS.en, ja: PATHS.ja, "x-default": PATHS.en },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${PATHS[locale]}`,
      siteName: "KakkoiDev",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
