import SubPage, { LinkList, h2, prose, section } from "@/components/SubPage";
import { now } from "@/data";
import { recentRepos } from "@/lib/github";

// English only, like /links. The paragraphs are hand-written in data/now.ts;
// the list is read from GitHub at build time and left out when it cannot be.
const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default async function Now() {
  const repos = await recentRepos();
  return (
    <SubPage
      title={now.title}
      lead={<p className="text-[16px] text-muted">{now.updated}</p>}
    >
      <div className={`${section} flex flex-col gap-[18px] ${prose}`}>
        {now.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {repos && repos.length > 0 && (
        <section className={section}>
          <h2 className={h2}>{now.recentHeading}</h2>
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
