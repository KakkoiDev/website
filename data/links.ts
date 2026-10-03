import { LinkGroup } from "@/type";

// The /links page (English only). Each entry points at the live site when
// there is one, otherwise at the repository.
export const linkGroups: LinkGroup[] = [
  {
    heading: "Teaching and community",
    links: [
      {
        name: "KakkoiSchool",
        href: "https://school.kakkoi.dev",
        description:
          "39 project-based lessons, from HTML and CSS to React, Next.js, Nest.js and AI.",
      },
      {
        name: "KakkoiSchool on GitHub",
        href: "https://github.com/KakkoiSchool",
        description: "The organization behind the school's projects.",
      },
      {
        name: "AI GUILD IZUMO",
        href: "https://ai-guild.kakkoi.dev",
        description: "A community in Izumo to learn, build and share with AI.",
      },
      {
        name: "Kakkoi Online",
        href: "https://online.kakkoi.dev",
        description:
          "A browser multiplayer game with no server, built in KakkoiSchool's lessons.",
      },
      {
        name: "Web Engineering Reforging",
        href: "https://wr.kakkoi.dev",
        description: "A public handbook of web engineering.",
      },
    ],
  },
  {
    heading: "Japanese",
    links: [
      {
        name: "Echo",
        href: "https://echo.kakkoi.dev",
        description:
          "Turn an English sentence into Japanese and learn it by shadowing.",
      },
      {
        name: "Minihongo",
        href: "https://minihongo.com",
        description: "231 words to express anything in Japanese.",
      },
      {
        name: "The Roots of Japanese",
        href: "https://kakkoidev.github.io/kanji-roots",
        description: "Learn Japanese vocabulary through its kanji building blocks.",
      },
      {
        name: "IT Japanese Anki decks",
        href: "https://github.com/KakkoiDev/nihongo-it-anki",
        description:
          "1,516 workplace sentences for software engineers, with natural audio.",
      },
    ],
  },
  {
    heading: "Apps and games",
    links: [
      {
        name: "Bible Reader",
        href: "https://bible.kakkoi.dev",
        description: "Read the Bible in 14 parallel editions, offline.",
      },
      {
        name: "Schness",
        href: "https://schness.com",
        description: "A 4×4 chess variant with AI opponents.",
      },
    ],
  },
  {
    heading: "AI and developer tools",
    links: [
      {
        name: "Intent Driven Development",
        href: "https://github.com/KakkoiDev/intent-driven-development",
        description:
          "Specify work so AI agents implement it faithfully and humans can verify it.",
      },
      {
        name: "Jikko",
        href: "https://github.com/KakkoiDev/jikko",
        description:
          "Plan, track and prove work in plain Markdown, for humans and agents.",
      },
      {
        name: "tmux agent tools",
        href: "https://github.com/KakkoiDev/tmux-agent-mesh",
        description:
          "Run fleets of AI coding agents in tmux: messaging, status, auto-resume, voice.",
      },
      {
        name: "git-dispatch",
        href: "https://github.com/KakkoiDev/git-dispatch",
        description: "Stacked PRs without the stack.",
      },
      {
        name: "tinyagent",
        href: "https://github.com/KakkoiDev/tinyagent",
        description:
          "A terminal agent on a 0.5B local model; every action is approved first.",
      },
      {
        name: "webmods",
        href: "https://github.com/KakkoiDev/webmods",
        description: "Userscripts that add features to Google Meet, GitHub and Slack.",
      },
    ],
  },
];
