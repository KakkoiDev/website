import type { Metadata } from "next";
import Link from "next/link";
import { contentSecurityPolicy } from "@/lib/csp";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

// With one root layout per language there is no layout to wrap a 404 in,
// so this page renders its own <html>. It speaks both languages because the
// URL that missed says nothing about the visitor's.
export const metadata: Metadata = {
  title: "404 — kakkoi.dev",
  robots: { index: false },
};

const link = "underline hover:text-muted min-h-[44px] flex items-center";

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
      </head>
      <body className="font-sans">
        <main className="mx-auto flex min-h-screen max-w-[768px] flex-col justify-center gap-4 px-4 sm:px-6">
          <h1 className="font-display text-[clamp(64px,10vw,104px)] leading-[0.9]">
            404
          </h1>
          <p className="text-[17px] font-medium">This page does not exist.</p>
          <p lang="ja" className="font-jp text-[15px] font-medium">
            お探しのページは見つかりませんでした。
          </p>
          <div className="flex gap-7">
            <Link className={link} href="/">
              Home
            </Link>
            <Link className={`${link} font-jp`} href="/ja/" lang="ja">
              ホーム
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
