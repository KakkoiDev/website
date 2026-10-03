import Link from "next/link";
import { contactEmail, dictionary, socialLinks } from "@/data";
import { Phrases } from "@/data/dictionary";
import { Locale } from "@/type";

// One server component for both languages. English and Japanese share the
// structure but not the type scale: Japanese never uses Bebas Neue and gets
// tighter spacing, because /ja is mostly opened on a phone from the 名刺 QR code.
const styles = {
  en: {
    gutter: "px-4 sm:px-6",
    header: "h-16",
    logo: "text-2xl",
    switch: "font-jp",
    hero: "pt-[160px] pb-[170px] gap-12",
    cube: "cube cube-lg",
    heroText: "gap-[10px]",
    name: "font-display font-normal text-[clamp(64px,10vw,104px)] leading-[0.9] tracking-[0.01em]",
    altName: "font-jp text-[14px] tracking-[0.3em]",
    title: "text-[17px] font-medium",
    section: "py-10",
    contactSection: "pt-10 pb-[72px]",
    h2: "mb-4 font-display font-normal text-[32px] tracking-[0.02em]",
    items: "gap-5",
    item: "text-[22px] font-semibold leading-[1.35]",
    links: "flex-row flex-wrap gap-x-7 gap-y-2 text-[16px]",
    footer: "pb-8 text-[13px]",
  },
  ja: {
    gutter: "px-4 sm:px-6",
    header: "h-14",
    logo: "text-[22px]",
    switch: "font-sans px-1",
    hero: "pt-[110px] pb-[120px] gap-8",
    cube: "cube",
    heroText: "gap-2",
    name: "font-jp font-bold text-[34px] leading-[1.25] tracking-[0.06em]",
    altName: "font-display text-[22px] tracking-[0.06em]",
    title: "mt-1 text-[15px] font-medium",
    section: "py-8",
    contactSection: "pt-8 pb-14",
    h2: "mb-[14px] font-jp font-bold text-[18px]",
    items: "gap-[18px]",
    item: "text-[18px] font-bold leading-[1.6]",
    links: "flex-col font-sans text-[15px]",
    footer: "pb-7 font-sans text-[12px]",
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
          </div>
        </section>
      </main>

      <footer lang={locale === "ja" ? "en" : undefined} className={`${column} text-muted ${s.footer}`}>
        {t.footer(new Date().getFullYear())}
      </footer>
    </>
  );
}
