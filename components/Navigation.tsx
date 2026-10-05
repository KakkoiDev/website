import Link from "next/link";
import { dictionary } from "@/data";
import { Locale } from "@/type";

export default function Navigation({ locale = "en", path = "/", translated = true }: {
  locale?: Locale;
  path?: string;
  translated?: boolean;
}) {
  const { nav } = dictionary[locale];
  const prefix = locale === "ja" ? "/ja" : "";
  const other = locale === "ja" ? "en" : "ja";
  const link = "flex min-h-[44px] items-center underline hover:text-muted";
  return (
    <header className="mx-auto flex min-h-16 max-w-[768px] flex-wrap items-center justify-between gap-x-4 px-4 sm:px-6">
      <Link href={`${prefix}/`} lang="en" className="flex min-h-[44px] items-center font-display text-2xl tracking-[0.03em] hover:text-muted">
        {nav.logo}
      </Link>
      <nav aria-label={nav.label} className="flex flex-wrap items-center gap-x-4 text-[14px]">
        <Link href={`${prefix}/now/`} aria-current={path === "/now/" ? "page" : undefined} className={link}>{nav.now}</Link>
        <Link href={`${prefix}/links/`} aria-current={path === "/links/" ? "page" : undefined} className={link}>{nav.links}</Link>
        {translated && <Link href={`${other === "ja" ? "/ja" : ""}${path}`} lang={other} hrefLang={other} className={`${link} ${other === "ja" ? "font-jp" : "font-sans"}`}>
          {nav.switchLabel}
        </Link>}
      </nav>
    </header>
  );
}
