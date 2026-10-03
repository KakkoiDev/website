import { Link, Icon } from "@/type";

export type PortfolioProjects = {
  title: string;
  link: (string | Link)[];
  technologies: Icon[];
  fallbackImage: string;
  video: string;
  description: string;
  achievements: string[];
}[];
