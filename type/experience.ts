import { Localized } from "@/type";

export type Experience = {
  company: Localized;
  location: Localized;
  role: Localized;
  start: `${number}-${number}`; // YYYY-MM
  end?: `${number}-${number}`; // omitted while current
  highlights: Localized<string[]>;
};
