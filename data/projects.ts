import { Project } from "@/type";

// Independent products and open-source work, newest focus first. Each entry
// is summarised from the project's own README; keep them in step with it.
export const projects: Project[] = [
  {
    title: "Echo",
    description:
      "An offline-first PWA that turns an English sentence into Japanese and teaches it through a listen-and-imitate shadowing loop, with export to Anki.",
    tags: ["PWA", "TypeScript", "IndexedDB", "Speech"],
    url: "https://echo.kakkoi.dev",
    repo: "https://github.com/KakkoiDev/jp-echo",
  },
  {
    title: "Minihongo",
    description:
      "231 words, infinite expression: the smallest Japanese speaking vocabulary that can express any idea, with grammar, reading and practice lessons.",
    tags: ["Education", "Japanese"],
    url: "https://minihongo.com",
    repo: "https://github.com/KakkoiDev/minihongo",
  },
  {
    title: "Schness",
    description:
      "A compact chess variant on a 4×4 board with piece drops, local AI opponents and a bot arena, fully bilingual in English and Japanese.",
    tags: ["Game", "AI", "i18n"],
    url: "https://schness.com",
    repo: "https://github.com/KakkoiDev/schness",
  },
  {
    title: "Bible Reader",
    description:
      "An offline-capable PWA for reading the Bible across fourteen parallel editions, from the King James Version to the Vulgate, with furigana for Japanese.",
    tags: ["PWA", "React", "TypeScript", "Offline"],
    url: "https://bible.kakkoi.dev",
    repo: "https://github.com/KakkoiDev/bible-reader",
  },
  {
    title: "KakkoiSchool",
    description:
      "A project-based curriculum of 39 lessons taking learners from HTML and CSS to React, Next.js, Nest.js and AI.",
    tags: ["Teaching", "Next.js", "Curriculum"],
    url: "https://school.kakkoi.dev",
  },
  {
    title: "git-dispatch",
    description:
      "Stacked PRs without the stack: code a feature on one branch, then project it into independent, focused PRs that never need a rebase or force-push.",
    tags: ["Git", "CLI", "Developer tools"],
    repo: "https://github.com/KakkoiDev/git-dispatch",
  },
  {
    title: "tmux agent tools",
    description:
      "A family of tmux plugins for running fleets of AI coding agents: a shared mailbox between agents, status tracking, rate-limit auto-resume and spoken summaries.",
    tags: ["AI agents", "tmux", "Bash"],
    repo: "https://github.com/KakkoiDev/tmux-agent-mesh",
  },
  {
    title: "tinyagent",
    description:
      "A terminal agent driven by a 0.5B-parameter local model whose output is constrained by a grammar, with every action shown for approval before it runs.",
    tags: ["Local AI", "llama.cpp", "Bash"],
    repo: "https://github.com/KakkoiDev/tinyagent",
  },
  {
    title: "webmods",
    description:
      "Single-file userscripts that add features to Google Meet, GitHub, Slack and more, built and published end to end with AI agents.",
    tags: ["Userscripts", "Chrome extension", "AI-assisted"],
    repo: "https://github.com/KakkoiDev/webmods",
  },
];
