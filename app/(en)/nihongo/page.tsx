import Nihongo from "@/components/Nihongo";
import { englishPageMetadata } from "@/lib/metadata";

export const metadata = englishPageMetadata(
  "/nihongo/",
  "Learn Japanese | kakkoi.dev",
  "Apps, sites and Anki decks by Cyril Antoni for learning Japanese: Echo, Minihongo, The Roots of Japanese and more.",
);

export default function Page() {
  return <Nihongo />;
}
