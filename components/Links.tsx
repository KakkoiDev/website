import Link from "next/link";
import SubPage, { LinkGroups, leadLink } from "@/components/SubPage";
import { linkGroups, linksPage } from "@/data";
import { Repo, taggedRepos } from "@/lib/github";
import { LinkGroup } from "@/type";

// English only, by the owner's choice: a page to share directly, with the
// same visual system as the home page.

const key = (value: string) => value.toLowerCase().replace(/\/+$/, "");

// Curated entries win: a tagged repo joins only when no entry already names
// it in `repo` or links where it would.
function withTaggedRepos(groups: LinkGroup[], repos: Repo[] | null) {
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
    ? [...groups, { heading: linksPage.moreHeading, links: more }]
    : groups;
}

export default async function Links() {
  const groups = withTaggedRepos(linkGroups, await taggedRepos());
  return (
    <SubPage
      title={linksPage.title}
      lead={
        <Link href="/now/" className={leadLink}>
          {linksPage.nowLink}
        </Link>
      }
    >
      <LinkGroups groups={groups} />
    </SubPage>
  );
}
