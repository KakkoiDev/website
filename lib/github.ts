// Build-time reads of the GitHub REST API for /links and /now. Every page is
// static, so these run during `next build` and never in the browser: the CSP
// is unaffected. Nothing here throws. On any failure (offline, rate limit,
// timeout, an unexpected response) it logs a warning and returns null, the
// page shows its hand-written content only, and the build still succeeds.

// GitHub Actions sets GITHUB_API_URL; anywhere else this is the public API.
// Pointing it at a host that does not answer is how the fallback is tested.
const API_URL = process.env.GITHUB_API_URL || "https://api.github.com";
const TIMEOUT_MS = 10_000;

// Public, unarchived repos with this topic in these accounts join /links.
export const LINKS_TOPIC = "kakkoi-links";
const LINKS_OWNERS = ["KakkoiDev", "KakkoiSchool"];
// /now lists this account only: KakkoiSchool holds students' projects.
const NOW_OWNER = "KakkoiDev";
const NOW_DAYS = 30;
const NOW_LIMIT = 8;

export type Repo = {
  name: string;
  /** "Owner/name", as `repo` is written in data/links.ts. */
  fullName: string;
  /** The repo's Website field when it is set, otherwise the repo itself. */
  href: string;
  description: string;
  pushedAt: string;
};

const isWebUrl = (value: unknown): value is string =>
  typeof value === "string" && /^https?:\/\//.test(value.trim());

// Only public, unarchived, original repos with a description get a line.
function toRepo(item: Record<string, unknown>): Repo[] {
  const { name, full_name, html_url, homepage, description, pushed_at } = item;
  if (
    item.private !== false ||
    item.archived !== false ||
    item.fork !== false ||
    typeof name !== "string" ||
    typeof full_name !== "string" ||
    !isWebUrl(html_url) ||
    typeof pushed_at !== "string" ||
    typeof description !== "string" ||
    !description.trim()
  ) {
    return [];
  }
  return [
    {
      name,
      fullName: full_name,
      href: (isWebUrl(homepage) ? homepage : html_url).trim(),
      // Shown verbatim on the site, which uses no em-dashes.
      description: description.trim().replace(/\s*\u2014\s*/g, ": "),
      pushedAt: pushed_at,
    },
  ];
}

// Several user: qualifiers in one query match any of them.
async function searchRepos(query: string): Promise<Repo[] | null> {
  const url = `${API_URL}/search/repositories?q=${encodeURIComponent(query)}&sort=updated&per_page=100`;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "kakkoi.dev-build",
  };
  const token = process.env.GITHUB_TOKEN;
  const get = (auth: boolean) =>
    fetch(url, {
      headers: auth ? { ...headers, Authorization: `Bearer ${token}` } : headers,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  try {
    // Set in the Pages workflow: a higher rate limit than anonymous requests.
    // A token GitHub rejects (a stale one in a local shell) costs one retry
    // without it rather than the whole list.
    let response = await get(Boolean(token));
    if (response.status === 401 && token) response = await get(false);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body: unknown = await response.json();
    const items = (body as { items?: unknown } | null)?.items;
    if (!Array.isArray(items)) throw new Error("no items in the response");
    return items.flatMap((item) =>
      item && typeof item === "object" ? toRepo(item as Record<string, unknown>) : [],
    );
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`GitHub search "${query}" failed (${reason}); using the hand-written content only.`);
    return null;
  }
}

/** Repos tagged for /links, by name; null when GitHub could not be read. */
export async function taggedRepos(): Promise<Repo[] | null> {
  const owners = LINKS_OWNERS.map((owner) => `user:${owner}`).join(" ");
  const repos = await searchRepos(
    `topic:${LINKS_TOPIC} ${owners} is:public archived:false`,
  );
  return repos && repos.sort((a, b) => a.name.localeCompare(b.name));
}

/** KakkoiDev repos pushed lately, newest first; null when GitHub could not be read. */
export async function recentRepos(): Promise<Repo[] | null> {
  const since = new Date(Date.now() - NOW_DAYS * 86_400_000);
  const day = since.toISOString().slice(0, 10);
  const repos = await searchRepos(
    `user:${NOW_OWNER} is:public fork:false archived:false pushed:>=${day}`,
  );
  return (
    repos &&
    repos
      .filter((repo) => new Date(repo.pushedAt) >= since)
      .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
      .slice(0, NOW_LIMIT)
  );
}
