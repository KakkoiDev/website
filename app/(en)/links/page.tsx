import type { Metadata } from "next";
import Links from "@/components/Links";

const title = "Links | kakkoi.dev";
const description =
  "Cyril Antoni's projects: KakkoiSchool, Japanese learning tools, apps and AI developer tools.";

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
  },
};

export default function Page() {
  return <Links />;
}
