import { fontVariables } from "@/lib/fonts";
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
    <html lang="en" className={fontVariables}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
