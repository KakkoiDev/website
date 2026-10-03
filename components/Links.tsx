import Link from "next/link";
import { linkGroups } from "@/data";

// English only, by the owner's choice: a page to share directly, with the
// same visual system as the home page.
const column = "mx-auto max-w-[768px] px-4 sm:px-6";
const link = "underline hover:text-muted";

export default function Links() {
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

      <main className={column}>
        <h1 className="pb-9 pt-16 font-display text-[clamp(56px,9vw,80px)] font-normal leading-[0.9] tracking-[0.01em]">
          Links
        </h1>

        {linkGroups.map((group) => (
          <section key={group.heading} className="border-t border-black py-9">
            <h2 className="mb-4 font-display text-[28px] font-normal tracking-[0.02em]">
              {group.heading}
            </h2>
            <ul className="flex flex-col gap-[18px]">
              {group.links.map(({ name, href, description }) => (
                <li key={href} className="flex flex-col gap-1">
                  <a
                    href={href}
                    className={`${link} flex min-h-[44px] items-center text-[20px] font-semibold leading-[1.4]`}
                  >
                    {name}
                  </a>
                  <span className="text-[16px] text-muted">{description}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className={`${column} pb-8 pt-9 text-[13px] text-muted`}>
        © {new Date().getFullYear()} Cyril Antoni
      </footer>
    </>
  );
}
