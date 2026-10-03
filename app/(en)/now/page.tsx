import Now from "@/components/Now";
import { englishPageMetadata } from "@/lib/metadata";

// lib/github.ts reads GitHub afresh at every build (no fetch cache, so a local
// rebuild never shows last build's data); force-static keeps that uncached
// read from making the page dynamic, which a static export cannot be.
export const dynamic = "force-static";

export const metadata = englishPageMetadata(
  "/now/",
  "Now | kakkoi.dev",
  "What Cyril Antoni is working on now: teaching, tools for learning Japanese, and AI coding agents.",
);

export default function Page() {
  return <Now />;
}
