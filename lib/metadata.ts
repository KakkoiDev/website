import type { Metadata } from "next";
import { dictionary } from "@/data";
import { Locale } from "@/type";

const SITE_URL = "https://kakkoi.dev";
const PATHS: Record<Locale, string> = { en: "/", ja: "/ja" };

export function localeMetadata(locale: Locale): Metadata {
  const { title, description } = dictionary[locale].meta;
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
      images: [{ url: "/cyril.jpg", alt: "Cyril Antoni" }],
    },
    twitter: { card: "summary", title, description, images: ["/cyril.jpg"] },
  };
}
