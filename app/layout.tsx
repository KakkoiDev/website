import type { Metadata } from "next";
import { Inter, Knewave } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const knewave = Knewave({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KakkoiDev",
  description: "Websites & Apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
