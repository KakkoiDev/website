import { localeMetadata } from "@/lib/metadata";
import { Locale } from "@/type";

export function pageMetadata(locale: Locale, path: string, title: string, description: string) {
  const base = localeMetadata(locale);
  const canonical = `${locale === "ja" ? "/ja" : ""}${path}`;
  return {
    ...base, title, description,
    alternates: { canonical, languages: { en: path, ja: `/ja${path}`, "x-default": path } },
    openGraph: { ...base.openGraph, url: `https://kakkoi.dev${canonical}`, title, description },
    twitter: { ...base.twitter, title, description },
  };
}
