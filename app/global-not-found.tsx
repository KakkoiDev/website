import type { Metadata } from "next";
import Link from "next/link";
import { bebasNeue, inter } from "@/lib/fonts";
import "./globals.css";

// With one root layout per language there is no layout to wrap a 404 in,
// so this page renders its own <html>. It speaks both languages because the
// URL that missed says nothing about the visitor's.
export const metadata: Metadata = {
  title: "404 | KakkoiDev",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-dotted min-h-screen flex flex-col items-center justify-center gap-8 px-8 text-center">
        <h1 className={`${bebasNeue.className} text-8xl tracking-[0.4rem]`}>
          404
        </h1>
        <p className="text-xl">This page does not exist.</p>
        <p className="text-xl" lang="ja">
          お探しのページは見つかりませんでした。
        </p>
        <div className="flex gap-6 text-lg">
          <Link className="underline" href="/">
            Home
          </Link>
          <Link className="underline" href="/ja" lang="ja">
            ホーム
          </Link>
        </div>
      </body>
    </html>
  );
}
