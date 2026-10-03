export type LinkItem = {
  name: string;
  href: string;
  description: string;
  // "Owner/name" of the project's GitHub repository, when it has a public one.
  // /links uses it to leave out tagged repos that are already listed.
  repo?: string;
};

export type LinkGroup = {
  heading: string;
  links: LinkItem[];
};
