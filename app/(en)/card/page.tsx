import type { Metadata } from "next";
import Card from "@/components/Card";
import { card } from "@/data";

// Opened by hand to show the QR code, so it is kept out of search, out of
// the sitemap, and not linked from any page.
export const metadata: Metadata = {
  title: card.meta.title,
  description: card.meta.description,
  alternates: { canonical: "/card/" },
  robots: { index: false },
};

export default function Page() {
  return <Card />;
}
