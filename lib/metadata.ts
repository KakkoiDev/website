import type { Metadata } from "next";
import { dictionary } from "@/data";
import { Locale } from "@/type";

const SITE_URL = "https://kakkoi.dev";
const PATHS: Record<Locale, string> = { en: "/", ja: "/ja/" };

export function localeMetadata(locale: Locale): Metadata {
  const { meta, hero } = dictionary[locale];
  const { title, description } = meta;
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
      images: [{ url: "/cyril.jpg", alt: hero.name }],
    },
    twitter: { card: "summary", title, description, images: ["/cyril.jpg"] },
  };
}

// The English-only pages (/links, /now, /nihongo): no hreflang alternates, and
// their own title in every preview rather than the home page's.
export function englishPageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  const image = { url: "/cyril.jpg", alt: dictionary.en.hero.name };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      siteName: "KakkoiDev",
      locale: "en_US",
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary", title, description, images: [image.url] },
  };
}
