import { contentSecurityPolicy } from "@/lib/csp";
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
      <head>
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
