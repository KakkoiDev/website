import Link from "next/link";
import { dictionary } from "@/data";
import { LinkGroup, LinkItem } from "@/type";

// The English-only pages next to the home page (/links, /now, /nihongo): the
// home page's header, column and footer around a title and its sections.
const { nav, footer } = dictionary.en;
const column = "mx-auto max-w-[768px] px-4 sm:px-6";
const link = "underline hover:text-muted";

export const section = "border-t border-black py-9";
export const h2 = "mb-4 font-display text-[28px] font-normal tracking-[0.02em]";
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

export function LinkGroups({ groups }: { groups: LinkGroup[] }) {
  return groups.map((group) => (
    <section key={group.heading} className={section}>
      <h2 className={h2}>{group.heading}</h2>
      <LinkList links={group.links} />
    </section>
  ));
}

export default function SubPage({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={`${column} flex h-16 items-center`}>
        <Link
          href="/"
          className="flex min-h-[44px] items-center font-display text-2xl tracking-[0.03em] hover:text-muted"
        >
          {nav.logo}
        </Link>
      </header>

      <main className={column}>
        <div className="pb-9 pt-16">
          <h1 className="font-display text-[clamp(56px,9vw,80px)] font-normal leading-[0.9] tracking-[0.01em]">
            {title}
          </h1>
          {lead && <div className="mt-4">{lead}</div>}
        </div>
        {children}
      </main>

      <footer className={`${column} pb-8 pt-9 text-[13px] text-muted`}>
        {footer(new Date().getFullYear())}
      </footer>
    </>
  );
}
