// The subfolder Pages serves the site from, as in next.config.mjs. next/link
// adds it to internal links on its own; a plain href to a file in public/
// needs it added here.
export const basePath = process.env.PAGES_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return `${basePath}${path}`;
}
