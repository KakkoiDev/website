import { Experience } from "@/type";

// From the resume, newest first. Client and partner names covered by an NDA
// stay out of this file.
export const experience: Experience[] = [
  {
    company: { en: "MeetsMore", ja: "株式会社ミツモア" },
    location: { en: "Japan", ja: "日本" },
    role: { en: "Senior Software Engineer", ja: "シニアソフトウェアエンジニア" },
    start: "2024-08",
    highlights: {
      en: [
        "Building ProOne, MeetsMore's B2B platform for managing people and equipment.",
        "Integrating AI features into ProOne and promoting AI feature development across the company.",
        "Created and leads a Language Exchange Lounge three times a week to improve Japanese and English across teams.",
      ],
      ja: [
        "人材と設備を管理するBtoBプラットフォーム「ProOne」の機能開発",
        "ProOneへのAI機能の組み込みと、社内のAI機能開発の推進",
        "日本語と英語の力を高めるランゲージエクスチェンジ・ラウンジを立ち上げ、週3回主催",
      ],
    },
  },
  {
    company: { en: "Freelance", ja: "フリーランス" },
    location: { en: "Remote", ja: "リモート" },
    role: {
      en: "Frontend & Mobile Developer",
      ja: "フロントエンド・モバイル開発",
    },
    start: "2024-04",
    end: "2024-08",
    highlights: {
      en: [
        "Built Next.js and React web apps for clients and helped publish a React game to its marketplace.",
      ],
      ja: [
        "クライアント向けにNext.js・ReactのWebアプリを開発し、Reactゲームのマーケット公開を支援",
      ],
    },
  },
  {
    company: { en: "Theseus AI", ja: "Theseus AI" },
    location: { en: "France", ja: "フランス" },
    role: { en: "Lead Frontend Developer", ja: "リードフロントエンドエンジニア" },
    start: "2023-04",
    end: "2024-04",
    highlights: {
      en: [
        "First full-time hire: designed the architecture and built 80% of the Next.js frontend of an AI platform that turns meeting audio into transcripts, summaries and follow-up tasks.",
        "Built the React Native recording app from scratch, with resumable uploads that survive bad networks and a locked phone.",
      ],
      ja: [
        "最初の正社員として参画。会議の音声から文字起こし・要約・タスクを生成するAIプラットフォームのアーキテクチャを設計し、Next.jsフロントエンドの8割を開発",
        "React Nativeの録音アプリをゼロから開発。レジューム可能なアップロードで、通信が不安定でも画面ロック中でも確実に送信",
      ],
    },
  },
  {
    company: { en: "La Fourche", ja: "La Fourche" },
    location: { en: "France", ja: "フランス" },
    role: { en: "Frontend Developer", ja: "フロントエンドエンジニア" },
    start: "2022-07",
    end: "2022-12",
    highlights: {
      en: [
        "Cart and checkout squad of an organic online store: added PayPal with a backend engineer, raising sales by 10%.",
      ],
      ja: [
        "オーガニック食品ECのカート・決済チームで、バックエンドエンジニアとPayPal決済を導入し売上を10%向上",
      ],
    },
  },
  {
    company: { en: "HelloAsso", ja: "HelloAsso" },
    location: { en: "France", ja: "フランス" },
    role: { en: "Frontend Developer", ja: "フロントエンドエンジニア" },
    start: "2021-04",
    end: "2022-05",
    highlights: {
      en: [
        "Dashboard and payment journey of France's largest platform for associations, ticketing and crowdfunding; fixed a timezone bug that recorded payments on the wrong day.",
      ],
      ja: [
        "フランス最大の団体向けチケット・クラウドファンディング基盤で、ダッシュボードと決済フローを担当。支払いが前日の日付で記録されるタイムゾーンのバグを解消",
      ],
    },
  },
  {
    company: {
      en: "Agitateurs de Destinations Numériques",
      ja: "Agitateurs de Destinations Numériques",
    },
    location: { en: "France", ja: "フランス" },
    role: { en: "Frontend Developer", ja: "フロントエンドエンジニア" },
    start: "2018-10",
    end: "2020-08",
    highlights: {
      en: [
        "Built a Tripadvisor-like platform with regional tourist offices in React, plus a Node.js image-resizing service that cut page load by over a second.",
      ],
      ja: [
        "地域の観光局と連携したTripadvisorのようなプラットフォームをReactで開発。Node.jsの画像リサイズサービスでページ表示を1秒以上短縮",
      ],
    },
  },
  {
    company: { en: "Idealcoms", ja: "Idealcoms" },
    location: { en: "France", ja: "フランス" },
    role: { en: "Full-stack Developer", ja: "フルスタックエンジニア" },
    start: "2017-09",
    end: "2018-07",
    highlights: {
      en: [
        "Maintained and modernised client websites, introducing WordPress and Laravel in place of in-house frameworks.",
      ],
      ja: [
        "クライアントのWebサイトを保守し、自社製フレームワークに代えてWordPressとLaravelを導入",
      ],
    },
  },
];
