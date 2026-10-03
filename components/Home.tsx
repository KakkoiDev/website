import Link from "next/link";
import { contactEmail, dictionary, socialLinks, vcardPath } from "@/data";
import { Phrases } from "@/data/dictionary";
import { withBasePath } from "@/lib/base-path";
import { Locale } from "@/type";

// One server component for both languages, on one shared scale: every
// element has the same size in English and Japanese, except the name, where
// condensed Bebas Neue needs more pixels than Noto Sans JP to read as the same
// size. Japanese never uses Bebas Neue.
const shared = {
  gutter: "px-4 sm:px-6",
  header: "h-16",
  logo: "text-2xl",
  hero: "pt-[128px] pb-[136px] gap-10",
  cube: "cube cube-lg",
  heroText: "gap-[10px]",
  title: "text-[16px] font-medium",
  section: "py-9",
  contactSection: "pt-9 pb-16",
  items: "gap-[18px]",
  links: "flex-row flex-wrap gap-x-7 gap-y-2 text-[16px]",
  footer: "pb-8 text-[13px]",
};

const styles = {
  en: {
    ...shared,
    switch: "font-jp",
    name: "font-display font-normal text-[clamp(56px,9vw,80px)] leading-[0.9] tracking-[0.01em]",
    altName: "font-jp text-[14px] tracking-[0.3em]",
    h2: "mb-4 font-display font-normal text-[28px] tracking-[0.02em]",
    item: "text-[20px] font-semibold leading-[1.4]",
    vcard: "",
  },
  ja: {
    ...shared,
    switch: "font-sans px-1",
    name: "font-jp font-bold text-[clamp(34px,5vw,44px)] leading-[1.25] tracking-[0.06em]",
    altName: "font-display text-[20px] tracking-[0.06em]",
    h2: "mb-4 font-jp font-bold text-[20px]",
    item: "text-[20px] font-bold leading-[1.6]",
    // The one Japanese label in the row of contact links.
    vcard: "font-jp",
    links: `${shared.links} font-sans`,
    footer: `${shared.footer} font-sans`,
  },
};

const otherLang: Record<Locale, Locale> = { en: "ja", ja: "en" };

const link = "underline hover:text-muted min-h-[44px] flex items-center";

function Text({ phrases }: { phrases: Phrases }) {
  if (typeof phrases === "string") return phrases;
  return phrases.map((phrase) => (
    <span key={phrase} className="ph">
      {phrase}
    </span>
  ));
}

export default function Home({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const s = styles[locale];
  const other = otherLang[locale];
  // 720px of content plus the gutters (the spec measures the column without padding).
  const column = `mx-auto max-w-[768px] ${s.gutter}`;

  return (
    <>
      <header className={`${column} ${s.header} flex items-center justify-between`}>
        <a
          href="#home"
          lang="en"
          className={`flex min-h-[44px] items-center font-display tracking-[0.03em] hover:text-muted ${s.logo}`}
        >
          {t.nav.logo}
        </a>
        {/* Link, not <a>, so the href picks up the base path. */}
        <Link
          href={t.nav.switchHref}
          lang={other}
          hrefLang={other}
          className={`text-[14px] ${link} ${s.switch}`}
        >
          {t.nav.switchLabel}
        </Link>
      </header>

      <main className={column}>
        <section
          id="home"
          className={`relative flex flex-col items-center text-center ${s.hero}`}
        >
          {/* Full viewport width, so the cube runs to the screen edge rather
              than stopping at the column's padding. The page clips it. */}
          <div
            aria-hidden="true"
            className="scene pointer-events-none absolute inset-y-0 left-1/2 z-0 flex w-screen -translate-x-1/2 items-center justify-center"
          >
            <div className={s.cube}>
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
          <div className={`relative z-[1] flex flex-col ${s.heroText}`}>
            <h1 className={s.name}>{t.hero.name}</h1>
            <div lang={other} className={s.altName}>
              {t.hero.altName}
            </div>
            <p className={s.title}>
              <Text phrases={t.hero.title} />
            </p>
          </div>
        </section>

        <section
          id="about"
          className={`relative z-[1] border-t border-black ${s.section}`}
        >
          <h2 className={s.h2}>{t.about.heading}</h2>
          <ul className={`flex flex-col ${s.items}`}>
            {t.about.items.map((item) => (
              <li key={String(item)} className={s.item}>
                <Text phrases={item} />
              </li>
            ))}
          </ul>
        </section>

        <section
          id="contact"
          className={`border-t border-black ${s.contactSection}`}
        >
          <h2 className={s.h2}>{t.contact.heading}</h2>
          <div lang="en" className={`flex ${s.links}`}>
            <a href={`mailto:${contactEmail}`} className={link}>
              {contactEmail}
            </a>
            {socialLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                {label}
              </a>
            ))}
            {/* A file in public/, so the base path is added by hand. */}
            <a
              href={withBasePath(vcardPath)}
              download
              lang={locale === "ja" ? "ja" : undefined}
              className={`${link} ${s.vcard}`}
            >
              {t.contact.addToContacts}
            </a>
          </div>
        </section>
      </main>

      <footer lang={locale === "ja" ? "en" : undefined} className={`${column} text-muted ${s.footer}`}>
        {t.footer(new Date().getFullYear())}
      </footer>
    </>
  );
}
