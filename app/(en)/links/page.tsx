import type { Metadata } from "next";
import Links from "@/components/Links";
import { shareImage } from "@/lib/metadata";

const title = "Links | kakkoi.dev";
const description =
  "Cyril Antoni's projects: KakkoiSchool, Japanese learning tools, apps and AI developer tools.";
const image = shareImage("en");

// English only, so no hreflang alternates.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/links/" },
  openGraph: {
    type: "website",
    url: "https://kakkoi.dev/links/",
    siteName: "KakkoiDev",
    locale: "en_US",
    title,
    description,
    images: [image],
  },
  // Its own title in previews, not the home page's from the layout.
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export default function Page() {
  return <Links />;
}
