import { Project } from "@/type";

// Independent products and open-source work, newest focus first. Each entry
// is summarised from the project's own README; keep them in step with it.
export const projects: Project[] = [
  {
    title: "Echo",
    description: {
      en: "An offline-first PWA that turns an English sentence into Japanese and teaches it through a listen-and-imitate shadowing loop, with export to Anki.",
      ja: "英語の文を日本語に変換し、聞いてまねるシャドーイングで身につけるオフライン対応のPWA。Ankiへの書き出しにも対応。",
    },
    tags: ["PWA", "TypeScript", "IndexedDB", "Speech"],
    url: "https://echo.kakkoi.dev",
    repo: "https://github.com/KakkoiDev/jp-echo",
  },
  {
    title: "Minihongo",
    description: {
      en: "231 words, infinite expression: the smallest Japanese speaking vocabulary that can express any idea, with grammar, reading and practice lessons.",
      ja: "231語で、どんなことも表現できる。日本語を話すための最小限の語彙を、文法・読解・練習のレッスンとともに学べる教材。",
    },
    tags: ["Education", "Japanese"],
    url: "https://minihongo.com",
    repo: "https://github.com/KakkoiDev/minihongo",
  },
  {
    title: "Schness",
    description: {
      en: "A compact chess variant on a 4×4 board with piece drops, local AI opponents and a bot arena, fully bilingual in English and Japanese.",
      ja: "4×4の盤で駒を打てるコンパクトなチェスの変種。ローカルAIとの対戦やボット同士の対戦も楽しめ、英語と日本語に完全対応。",
    },
    tags: ["Game", "AI", "i18n"],
    url: "https://schness.com",
    repo: "https://github.com/KakkoiDev/schness",
  },
  {
    title: "Bible Reader",
    description: {
      en: "An offline-capable PWA for reading the Bible across fourteen parallel editions, from the King James Version to the Vulgate, with furigana for Japanese.",
      ja: "欽定訳からウルガタまで、14の版を並べて読めるオフライン対応の聖書リーダー（PWA）。日本語の文語訳にはふりがな付き。",
    },
    tags: ["PWA", "React", "TypeScript", "Offline"],
    url: "https://bible.kakkoi.dev",
    repo: "https://github.com/KakkoiDev/bible-reader",
  },
  {
    title: "KakkoiSchool",
    description: {
      en: "A project-based curriculum of 39 lessons taking learners from HTML and CSS to React, Next.js, Nest.js and AI.",
      ja: "HTML・CSSからReact、Next.js、Nest.js、AIまでを39のレッスンで学ぶ、プロジェクト型のカリキュラム。",
    },
    tags: ["Teaching", "Next.js", "Curriculum"],
    url: "https://school.kakkoi.dev",
  },
  {
    title: "git-dispatch",
    description: {
      en: "Stacked PRs without the stack: code a feature on one branch, then project it into independent, focused PRs that never need a rebase or force-push.",
      ja: "スタックしない「スタックドPR」。1つのブランチで機能を開発し、リベースも強制プッシュも不要な独立した小さなPRに分割できるGitツール。",
    },
    tags: ["Git", "CLI", "Developer tools"],
    repo: "https://github.com/KakkoiDev/git-dispatch",
  },
  {
    title: "tmux agent tools",
    description: {
      en: "A family of tmux plugins for running fleets of AI coding agents: a shared mailbox between agents, status tracking, rate-limit auto-resume and spoken summaries.",
      ja: "複数のAIコーディングエージェントをtmuxで運用するためのプラグイン群。エージェント間のメッセージ共有、状態の追跡、レート制限後の自動再開、音声での報告に対応。",
    },
    tags: ["AI agents", "tmux", "Bash"],
    repo: "https://github.com/KakkoiDev/tmux-agent-mesh",
  },
  {
    title: "tinyagent",
    description: {
      en: "A terminal agent driven by a 0.5B-parameter local model whose output is constrained by a grammar, with every action shown for approval before it runs.",
      ja: "0.5Bパラメータのローカルモデルで動くターミナル用エージェント。出力は文法で制約され、すべての操作は実行前に承認を求めます。",
    },
    tags: ["Local AI", "llama.cpp", "Bash"],
    repo: "https://github.com/KakkoiDev/tinyagent",
  },
  {
    title: "webmods",
    description: {
      en: "Single-file userscripts that add features to Google Meet, GitHub, Slack and more, built and published end to end with AI agents.",
      ja: "Google Meet、GitHub、Slackなどに機能を追加する1ファイル完結のユーザースクリプト集。開発から公開までAIエージェントで行っています。",
    },
    tags: ["Userscripts", "Chrome extension", "AI-assisted"],
    repo: "https://github.com/KakkoiDev/webmods",
  },
];
