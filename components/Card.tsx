import Link from "next/link";
import { card, contactEmail, vcardPath } from "@/data";
import { withBasePath } from "@/lib/base-path";
import { qrCode } from "@/lib/qr";

// Both languages on one screen, like the 404: whoever scans it may read
// either. Sized to fit a phone without scrolling.
const column = "mx-auto max-w-[768px] px-4 sm:px-6";
const link = "underline hover:text-muted min-h-[44px] flex items-center";

const qr = qrCode(card.qrUrl);

export default function Card() {
  return (
    <>
      <header className={`${column} flex h-16 items-center`}>
        <Link
          href="/"
          className="flex min-h-[44px] items-center font-display text-2xl tracking-[0.03em] hover:text-muted"
        >
          KakkoiDev
        </Link>
      </header>

      <main className={`${column} flex flex-col items-center pb-8 pt-2 text-center`}>
        <h1 className="font-display text-[clamp(56px,9vw,80px)] font-normal leading-[0.9] tracking-[0.01em]">
          {card.name}
        </h1>
        {/* The left padding balances the tracking after the last character. */}
        <p lang="ja" className="mt-2 pl-[0.3em] font-jp text-[14px] tracking-[0.3em]">
          {card.nameJa}
        </p>
        <p className="mt-3 text-[16px] font-medium">{card.title}</p>

        {/* Black on white, quiet zone included: 8px a module on phones. */}
        <svg
          viewBox={`0 0 ${qr.size} ${qr.size}`}
          role="img"
          aria-label={card.qrLabel}
          shapeRendering="crispEdges"
          className="mt-5 aspect-square w-full max-w-[296px] sm:max-w-[370px]"
        >
          <rect width={qr.size} height={qr.size} fill="#fff" />
          <path d={qr.path} fill="#000" />
        </svg>

        <p className="mt-2 text-[14px] text-muted">{card.caption.en}</p>
        <p lang="ja" className="font-jp text-[14px] text-muted">
          {card.caption.ja}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-x-7 text-[16px]">
          {/* A file in public/, so the base path is added by hand. */}
          <a href={withBasePath(vcardPath)} download className={link}>
            {card.addToContacts.en}
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <span lang="ja" className="font-jp">
              {card.addToContacts.ja}
            </span>
          </a>
          <a href={`mailto:${contactEmail}`} className={link}>
            {contactEmail}
          </a>
        </div>
      </main>
    </>
  );
}
