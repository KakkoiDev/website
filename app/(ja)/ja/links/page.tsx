import Links from "@/components/Links";
import { linksPage } from "@/data";
import { pageMetadata } from "@/lib/page-metadata";

// GitHub is read afresh at build time; these pages are statically exported.
export const dynamic = "force-static";
export const metadata = pageMetadata(
  "ja", "/links/", `${linksPage.ja.title} | kakkoi.dev`,
  linksPage.ja.description,
);

export default function Page() {
  return <Links locale="ja" />;
}
