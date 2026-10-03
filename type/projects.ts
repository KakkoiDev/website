import { Localized } from "@/type";

export type Project = {
  title: string;
  description: Localized;
  tags: string[];
  url?: string;
  repo?: string;
};
