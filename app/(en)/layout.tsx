import { inter } from "@/lib/fonts";
import { localeMetadata } from "@/lib/metadata";
import "../globals.css";

// One root layout per language, so each page ships the right <html lang>.
export const metadata = localeMetadata("en");

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
