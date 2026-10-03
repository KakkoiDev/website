import { notoSansJP } from "@/lib/fonts";
import { localeMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = localeMetadata("ja");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
