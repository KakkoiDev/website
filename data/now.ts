// The /now page: what Cyril is working on. Rewrite the
// paragraphs when the focus changes, and the month with them. The list of
// recently updated repositories under them refreshes itself at every build.
const en = {
  title: "Now",
  updated: "Updated October 2026",
  paragraphs: [
    "Teaching web development and AI: project-based lessons at KakkoiSchool, from HTML and CSS to React, Next.js and AI, and AI GUILD IZUMO, a community to learn, build and share with AI.",
    "Building tools for learning Japanese: Echo, which turns an English sentence into Japanese to learn by shadowing; Minihongo, 231 words to express any idea; and Anki decks with natural audio. JP Core is the library they share.",
    "Making AI coding agents easier to run and to trust: Jikko keeps the plan, the progress and the proof of work in plain Markdown, Intent Driven Development specifies work so agents implement it faithfully, and the tmux agent tools run many agents side by side.",
  ],
  recentHeading: "Recently updated",
};

const ja: typeof en = {
  title: "近況",
  updated: "2026年10月更新",
  paragraphs: [
    "ウェブ開発とAIを教えています。KakkoiSchoolでは、HTML・CSSからReact・Next.js・AIまで、プロジェクトを通じて学ぶ授業を行っています。AI GUILD IZUMOは、AIで学び、作り、共有するためのコミュニティです。",
    "日本語学習のためのツールを作っています。英語の文を日本語にしてシャドーイングで学ぶEcho、231語であらゆる考えを表現するMinihongo、自然な音声付きのAnkiデッキです。これらは共通ライブラリのJP Coreを使っています。",
    "AIコーディングエージェントを、より簡単に動かし、安心して使えるようにしています。Jikkoは計画・進捗・作業の証拠をプレーンなMarkdownで管理します。Intent Driven Developmentは、エージェントが意図どおりに実装できるよう作業を仕様化します。tmux agent toolsは、多数のエージェントを並行して動かすためのツールです。",
  ],
  recentHeading: "最近の更新",
};

export const now = { en, ja };
