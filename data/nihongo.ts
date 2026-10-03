import { LinkGroup } from "@/type";

// The /nihongo page (English only): everything Cyril has made for learning
// Japanese. Each line follows the project's own README.
export const nihongo: { title: string; intro: string; groups: LinkGroup[] } = {
  title: "Learn Japanese",
  intro:
    "Apps, sites and Anki decks I made for learning Japanese, from a first 231 words to the Bible in classical Japanese.",
  groups: [
    {
      heading: "Learn and practice",
      links: [
        {
          name: "Echo",
          href: "https://echo.kakkoi.dev",
          description:
            "Turn an English sentence into Japanese and learn it by shadowing: listen, then repeat.",
        },
        {
          name: "Minihongo",
          href: "https://minihongo.com",
          description:
            "231 words to express any idea in Japanese, and the real Japanese to recognize in reply.",
        },
        {
          name: "The Roots of Japanese",
          href: "https://kakkoidev.github.io/kanji-roots",
          description:
            "Vocabulary by its kanji building blocks, the way English speakers learn from Latin roots.",
        },
        {
          name: "Bible Reader",
          href: "https://bible.kakkoi.dev",
          description:
            "The Bible in classical Japanese (文語訳) with furigana, beside the King James Version, offline.",
        },
      ],
    },
    {
      heading: "Anki decks",
      links: [
        {
          name: "IT Japanese Anki decks",
          href: "https://github.com/KakkoiDev/nihongo-it-anki",
          description:
            "1,516 workplace sentences for software engineers, casual to keigo, with AI voice and pitch accent.",
        },
        {
          name: "Bible Japanese Anki",
          href: "https://github.com/KakkoiDev/bible-japanese-anki",
          description:
            "The 361 words taught in Japanese Bible Study Club's 15 video lessons, as 722 cards.",
        },
      ],
    },
    {
      heading: "Build your own",
      links: [
        {
          name: "anki-voiced",
          href: "https://github.com/KakkoiDev/anki-voiced",
          description:
            "Make Japanese Anki decks with natural AI voice, pitch accent and furigana on each kanji.",
        },
        {
          name: "JP Core",
          href: "https://github.com/KakkoiDev/jp-core",
          description:
            "The library most of these share: furigana, readings, speech and Anki packaging.",
        },
      ],
    },
  ],
};
