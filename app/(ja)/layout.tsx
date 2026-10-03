import { contentSecurityPolicy } from "@/lib/csp";
import { fontVariables } from "@/lib/fonts";
import { localeMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = localeMetadata("ja");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={fontVariables}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
      </head>
      <body className="font-jp">{children}</body>
    </html>
  );
}
