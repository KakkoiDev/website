import { LinkGroup } from "@/type";

// The /links page (English only). Each entry points at the live site when
// there is one, otherwise at the repository; `repo` names the repository
// either way. Public repos tagged with the GitHub topic in lib/github.ts are
// added after these at build time, unless their `repo` is already here.
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
        repo: "KakkoiSchool/ai-guild",
      },
      {
        name: "Kakkoi Online",
        href: "https://online.kakkoi.dev",
        description:
          "A browser multiplayer game with no server, built in KakkoiSchool's lessons.",
        repo: "KakkoiSchool/kakkoi-online",
      },
      {
        name: "Web Engineering Reforging",
        href: "https://wr.kakkoi.dev",
        description: "A public handbook of web engineering.",
        repo: "KakkoiDev/web-engineering-reforging",
      },
    ],
  },
  {
    heading: "Japanese",
    links: [
      {
        name: "Learn Japanese",
        href: "/nihongo/",
        description: "Every tool and Anki deck for learning Japanese, on one page.",
      },
      {
        name: "Echo",
        href: "https://echo.kakkoi.dev",
        description:
          "Turn an English sentence into Japanese and learn it by shadowing.",
        repo: "KakkoiDev/jp-echo",
      },
      {
        name: "Minihongo",
        href: "https://minihongo.com",
        description: "231 words to express anything in Japanese.",
        repo: "KakkoiDev/minihongo",
      },
      {
        name: "The Roots of Japanese",
        href: "https://kakkoidev.github.io/kanji-roots",
        description: "Learn Japanese vocabulary through its kanji building blocks.",
        repo: "KakkoiDev/kanji-roots",
      },
      {
        name: "IT Japanese Anki decks",
        href: "https://github.com/KakkoiDev/nihongo-it-anki",
        description:
          "1,516 workplace sentences for software engineers, with natural audio.",
        repo: "KakkoiDev/nihongo-it-anki",
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
        repo: "KakkoiDev/bible-reader",
      },
      {
        name: "Schness",
        href: "https://schness.com",
        description: "A 4×4 chess variant with AI opponents.",
        repo: "KakkoiDev/schness",
      },
      {
        name: "QR Generator",
        href: "https://qr.kakkoi.dev",
        description:
          "Make a QR code as you type, share it by URL and download it as SVG.",
        repo: "KakkoiDev/qr-generator",
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
        repo: "KakkoiDev/intent-driven-development",
      },
      {
        name: "Jikko",
        href: "https://github.com/KakkoiDev/jikko",
        description:
          "Plan, track and prove work in plain Markdown, for humans and agents.",
        repo: "KakkoiDev/jikko",
      },
      {
        name: "tmux agent tools",
        href: "https://github.com/KakkoiDev/tmux-agent-mesh",
        description:
          "Run fleets of AI coding agents in tmux: messaging, status, auto-resume, voice.",
        repo: "KakkoiDev/tmux-agent-mesh",
      },
      {
        name: "git-dispatch",
        href: "https://github.com/KakkoiDev/git-dispatch",
        description: "Stacked PRs without the stack.",
        repo: "KakkoiDev/git-dispatch",
      },
      {
        name: "tinyagent",
        href: "https://github.com/KakkoiDev/tinyagent",
        description:
          "A terminal agent on a 0.5B local model; every action is approved first.",
        repo: "KakkoiDev/tinyagent",
      },
      {
        name: "webmods",
        href: "https://github.com/KakkoiDev/webmods",
        description: "Userscripts that add features to Google Meet, GitHub and Slack.",
        repo: "KakkoiDev/webmods",
      },
    ],
  },
];

export const linksPage = {
  title: "Links",
  nowLink: "What I'm working on now",
  // The last group: tagged repos that no entry above lists.
  moreHeading: "More projects",
};
