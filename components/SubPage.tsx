import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Locale } from "@/type";
import { dictionary } from "@/data";
import { LinkGroup, LinkItem } from "@/type";

// Shared shell for content pages in either language.
const column = "mx-auto max-w-[768px] px-4 sm:px-6";
const link = "underline hover:text-muted";

export const section = "border-t border-black py-9";
export const h2 = "mb-4 font-display text-[28px] font-normal tracking-[0.02em]";
export const heading = (locale: Locale) => locale === "ja" ? "mb-4 font-jp text-[20px] font-bold" : h2;
export const prose = "text-[18px] leading-[1.6]";
export const leadLink = `${link} flex min-h-[44px] items-center text-[16px]`;

// next/link for this site's own pages, so they pick up the base path.
function Anchor({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

// Japanese inside an English line (文語訳, or a description from GitHub) is
// marked as Japanese and set in Noto Sans JP, like all Japanese on the site.
const japanese = /([\u3000-\u30ff\u3400-\u9fff\uf900-\ufaff\uff00-\uffef]+)/;

function Mixed({ text }: { text: string }) {
  return text.split(japanese).map((part, i) =>
    i % 2 ? (
      <span key={i} lang="ja" className="font-jp">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

type Item = Omit<LinkItem, "repo"> & { note?: React.ReactNode };

export function LinkList({ links }: { links: Item[] }) {
  return (
    <ul className="flex flex-col gap-[18px]">
      {links.map(({ name, href, description, note }) => (
        <li key={`${name} ${href}`} className="flex flex-col gap-1">
          <Anchor
            href={href}
            className={`${link} flex min-h-[44px] items-center text-[20px] font-semibold leading-[1.4]`}
          >
            {name}
          </Anchor>
          <span className="text-[16px] text-muted">
            <Mixed text={description} />
          </span>
          {note}
        </li>
      ))}
    </ul>
  );
}

export function LinkGroups({ groups, locale = "en" }: { groups: LinkGroup[]; locale?: Locale }) {
  return groups.map((group) => (
    <section key={group.heading} className={section}>
      <h2 className={heading(locale)}>{group.heading}</h2>
      <LinkList links={group.links} />
    </section>
  ));
}

export default function SubPage({
  title,
  lead,
  children,
  locale = "en",
  path = "/",
  translated = false,
}: {
  title: string;
  locale?: Locale;
  path?: string;
  translated?: boolean;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation locale={locale} path={path} translated={translated} />

      <main className={column}>
        <div className="pb-9 pt-16">
          <h1 className={locale === "ja" ? "font-jp text-[clamp(34px,5vw,44px)] font-bold leading-[1.25] tracking-[0.06em]" : "font-display text-[clamp(56px,9vw,80px)] font-normal leading-[0.9] tracking-[0.01em]"}>
            {title}
          </h1>
          {lead && <div className="mt-4">{lead}</div>}
        </div>
        {children}
      </main>

      <footer className={`${column} pb-8 pt-9 text-[13px] text-muted`}>
        {dictionary[locale].footer(new Date().getFullYear())}
      </footer>
    </>
  );
}
