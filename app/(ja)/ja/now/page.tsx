import Now from "@/components/Now";
import { now } from "@/data";
import { pageMetadata } from "@/lib/page-metadata";

// GitHub is read afresh at build time; these pages are statically exported.
export const dynamic = "force-static";
export const metadata = pageMetadata(
  "ja", "/now/", `${now.ja.title} | kakkoi.dev`,
  "アントニ キリルの近況：教育、日本語学習ツール、AIコーディングエージェント。",
);

export default function Page() {
  return <Now locale="ja" />;
}
