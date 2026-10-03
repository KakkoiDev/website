import { Locale } from "@/type";

// Japanese text is split into phrases. Each phrase renders as an inline-block,
// so a line only breaks between phrases and never strands a lone character.
export type Phrases = string | string[];

type Dictionary = {
  meta: { title: string; description: string };
  nav: { logo: string; switchLabel: string; switchHref: string };
  hero: { name: string; altName: string; title: Phrases };
  about: { heading: string; items: Phrases[] };
  contact: { heading: string };
  footer: (year: number) => string;
};

// Name order is deliberate: given name first in English contexts, family name
// first in Japanese ones, in both scripts.
const en: Dictionary = {
  meta: {
    title: "Cyril Antoni — kakkoi.dev",
    description:
      "Cyril Antoni. I fix problems, and I help others get better at fixing problems.",
  },
  nav: { logo: "KakkoiDev", switchLabel: "日本語", switchHref: "/ja/" },
  hero: {
    name: "Cyril Antoni",
    altName: "キリル アントニ",
    title: "Software engineer · AI",
  },
  about: {
    heading: "What I do",
    items: ["I fix problems.", "I help others get better at fixing problems."],
  },
  contact: { heading: "Contact" },
  footer: (year) => `© ${year} Cyril Antoni`,
};

const ja: Dictionary = {
  meta: {
    title: "アントニ キリル — kakkoi.dev",
    description:
      "アントニ キリル。問題を解決し、人が問題をもっとうまく解決できるよう手助けします。",
  },
  nav: { logo: "KakkoiDev", switchLabel: "English", switchHref: "/" },
  hero: {
    name: "アントニ キリル",
    altName: "Antoni Cyril",
    title: ["ソフトウェアエンジニア", "・AI"],
  },
  about: {
    heading: "できること",
    items: [
      ["問題を解決します。"],
      ["人が問題を", "もっとうまく", "解決できるよう", "手助けします。"],
    ],
  },
  contact: { heading: "連絡先" },
  footer: (year) => `© ${year} Antoni Cyril`,
};

export const dictionary: Record<Locale, Dictionary> = { en, ja };
