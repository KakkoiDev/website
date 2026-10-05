import SubPage, { LinkGroups } from "@/components/SubPage";
import { linkGroups, linksPage } from "@/data";
import { Repo, taggedRepos } from "@/lib/github";
import { LinkGroup, Locale } from "@/type";

// Both languages use the same curated destinations and GitHub discovery.

const key = (value: string) => value.toLowerCase().replace(/\/+$/, "");

// Curated entries win: a tagged repo joins only when no entry already names
// it in `repo` or links where it would.
function withTaggedRepos(groups: LinkGroup[], repos: Repo[] | null, locale: Locale) {
  const listed = new Set(
    groups.flatMap(({ links }) =>
      links.flatMap(({ href, repo }) => (repo ? [key(href), key(repo)] : [key(href)])),
    ),
  );
  const more = (repos ?? [])
    .filter(({ fullName, href }) => !listed.has(key(fullName)) && !listed.has(key(href)))
    .map(({ name, href, description, fullName }) => ({
      name,
      href,
      description,
      repo: fullName,
    }));
  return more.length > 0
    ? [...groups, { heading: linksPage[locale].moreHeading, links: more }]
    : groups;
}

export default async function Links({ locale = "en" }: { locale?: Locale }) {
  const groups = withTaggedRepos(linkGroups[locale], await taggedRepos(), locale);
  return (
    <SubPage locale={locale} path="/links/" translated title={linksPage[locale].title}>
      <LinkGroups groups={groups} locale={locale} />
    </SubPage>
  );
}
