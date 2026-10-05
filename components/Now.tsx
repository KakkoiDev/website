import SubPage, { LinkList, heading, prose, section } from "@/components/SubPage";
import { now } from "@/data";
import { Locale } from "@/type";
import { recentRepos } from "@/lib/github";

// Repository descriptions stay as written on GitHub in both languages.
export default async function Now({ locale = "en" }: { locale?: Locale }) {
  const t = now[locale];
  const day = new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    month: "short", day: "numeric", timeZone: "UTC",
  });
  const repos = await recentRepos();
  return (
    <SubPage
      locale={locale}
      path="/now/"
      translated
      title={t.title}
      lead={<p className="text-[16px] text-muted">{t.updated}</p>}
    >
      <div className={`${section} flex flex-col gap-[18px] ${prose}`}>
        {t.paragraphs.map((paragraph) => (
          <p key={paragraph} className={locale === "ja" ? "[text-wrap:pretty]" : undefined}>{paragraph}</p>
        ))}
      </div>

      {repos && repos.length > 0 && (
        <section className={section}>
          <h2 className={heading(locale)}>{t.recentHeading}</h2>
          <LinkList
            links={repos.map(({ name, href, description, pushedAt }) => ({
              name,
              href,
              description,
              note: (
                <time dateTime={pushedAt} className="text-[14px] text-muted">
                  {day.format(new Date(pushedAt))}
                </time>
              ),
            }))}
          />
        </section>
      )}
    </SubPage>
  );
}
