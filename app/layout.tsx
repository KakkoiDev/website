import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const title = "KakkoiDev: Web & App Development";
const description =
  "Cyril, a web and mobile developer building with Next.js, TypeScript and React Native, plus open-source tools and Japanese learning apps.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kakkoi.dev"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://kakkoi.dev",
    siteName: "KakkoiDev",
    title,
    description,
    images: [{ url: "/cyril.jpg", alt: "Cyril from KakkoiDev" }],
  },
  twitter: { card: "summary", title, description, images: ["/cyril.jpg"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
