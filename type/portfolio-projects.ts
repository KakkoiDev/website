import { Link } from "@/type";

export type PortfolioProjects = {
  title: string;
  link: (string | Link)[];
  technologies: ("nextjs" | "tailwind")[];
  fallbackImage: string;
  video: string;
  description: string;
  archivements: string[];
}[];
