import { Link, Icon, Localized } from "@/type";

export type PortfolioProjects = {
  title: string;
  link: (string | Link)[];
  technologies: Icon[];
  fallbackImage: string;
  video: string;
  description: Localized;
  achievements: Localized<string[]>;
}[];
