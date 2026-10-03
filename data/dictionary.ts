import { Locale } from "@/type";

export const CAREER_START_YEAR = 2018;

const en = {
  meta: {
    title: "KakkoiDev: Web & App Development",
    description:
      "Cyril Antoni, a full-stack web engineer building with Next.js, TypeScript and React Native, and integrating AI features as a Senior Software Engineer at MeetsMore in Japan.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    portfolio: "Portfolio",
    projects: "Projects",
    contact: "Contact Me",
    otherLocale: { label: "日本語", href: "/ja", lang: "ja" },
  },
  hero: { studio: "KakkoiDev Studio", line1: "Web & App", line2: "Development" },
  about: {
    title: "About",
    photoAlt: "Picture of Cyril",
    welcome: "Welcome, I'm Cyril",
    intro: (years: number) =>
      `A full-stack web engineer with over ${years} years of experience, specialized in Next.js, TypeScript and React Native. I'm a Senior Software Engineer at MeetsMore in Japan, where I integrate AI features into the ProOne platform and promote AI feature development across the company.`,
    languages:
      "Languages: French (native), English (fluent), Japanese (conversational)",
    achievementsTitle: "My achievements",
    achievements: [
      {
        icon: "icon-[mdi--robot-outline]",
        text: "Integrating AI features into MeetsMore's ProOne platform and promoting AI feature development across the company.",
      },
      {
        icon: "icon-[mdi--application-brackets-outline]",
        text: "Created from scratch a webapp and a mobile app for a fintech startup.",
      },
      {
        icon: "icon-[mdi--attach-money]",
        text: "Increased revenue by 10% ($1 million/year) for an online organic retail store by implementing a new payment option.",
      },
      {
        icon: "icon-[mdi--bug-outline]",
        text: "Fixed a bug intrinsic to the JavaScript language that was corrupting payment records.",
      },
    ],
    whatIDoTitle: "What I do",
    whatIDo: [
      {
        icon: "icon-[mdi--application-brackets-outline]",
        text: "Build high-quality, scalable, and user-friendly websites and mobile applications.",
      },
      {
        icon: "icon-[mdi--robot-outline]",
        text: "Design and ship AI features in production products.",
      },
      {
        icon: "icon-[mdi--bug-outline]",
        text: "Debug and maintain existing apps.",
      },
      { icon: "icon-[mdi--account-tie]", text: "Lead and mentor teams." },
    ],
    videoAlt: "How to make a website?",
    playVideo: "Play the video",
  },
  experience: {
    title: "Experience",
    present: "Present",
    place: (company: string, location: string) => `${company}, ${location}`,
  },
  portfolio: { title: "Portfolio" },
  projects: {
    title: "Recent Projects",
    intro: "Products and open-source tools I design and build on my own time.",
    visit: "Visit",
    source: "Source",
  },
  contact: {
    title: "Contact Me",
    emailLabel: "Your email",
    emailPlaceholder: "Enter your email...",
    emailRequired: "Email required",
    emailInvalid: "Invalid email address",
    messageLabel: "Your message",
    messagePlaceholder: "Enter your message...",
    messageRequired: "Message required",
    send: "Send",
    sending: "Sending",
    sent: "Message sent!\nI'll get back to you within 2 business days.",
    failed: "The message was not sent!\nPlease try again later.",
    offline: "The message was not sent!\nMake sure you are online.",
    formErrors: "Please check the form for errors.",
    dismiss: "Dismiss",
  },
  formatMonth: (year: number, month: number) =>
    `${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][month - 1]
    } ${year}`,
};

export type Dictionary = typeof en;

const ja: Dictionary = {
  meta: {
    title: "KakkoiDev｜Web・アプリ開発",
    description:
      "Next.js・TypeScript・React Nativeを専門とするフルスタックWebエンジニア、アントニ・キリルのポートフォリオ。株式会社ミツモアのシニアソフトウェアエンジニアとして、AI機能の開発に取り組んでいます。",
  },
  nav: {
    about: "プロフィール",
    experience: "経歴",
    portfolio: "実績",
    projects: "プロジェクト",
    contact: "お問い合わせ",
    otherLocale: { label: "EN", href: "/", lang: "en" },
  },
  hero: { studio: "KakkoiDev Studio", line1: "Web・アプリ", line2: "開発" },
  about: {
    title: "プロフィール",
    photoAlt: "アントニ・キリルの写真",
    welcome: "はじめまして、キリルです",
    intro: (years: number) =>
      `Next.js・TypeScript・React Nativeを専門とする、経験${years}年以上のフルスタックWebエンジニアです。現在は株式会社ミツモアのシニアソフトウェアエンジニアとして、ProOneへのAI機能の組み込みと、社内でのAI機能開発の推進に取り組んでいます。`,
    languages: "言語：フランス語（ネイティブ）、英語（流暢）、日本語（日常会話）",
    achievementsTitle: "主な実績",
    achievements: [
      {
        icon: "icon-[mdi--robot-outline]",
        text: "ミツモアのProOneにAI機能を組み込み、社内のAI機能開発を推進",
      },
      {
        icon: "icon-[mdi--application-brackets-outline]",
        text: "フィンテック系スタートアップでWebアプリとモバイルアプリをゼロから開発",
      },
      {
        icon: "icon-[mdi--attach-money]",
        text: "オーガニック食品ECサイトに新しい決済手段を導入し、売上を10%（年間約100万ドル）向上",
      },
      {
        icon: "icon-[mdi--bug-outline]",
        text: "決済記録を壊していた、JavaScriptの仕様に起因するバグを解消",
      },
    ],
    whatIDoTitle: "できること",
    whatIDo: [
      {
        icon: "icon-[mdi--application-brackets-outline]",
        text: "高品質でスケーラブル、使いやすいWebサイトとモバイルアプリの開発",
      },
      {
        icon: "icon-[mdi--robot-outline]",
        text: "AI機能の設計から本番リリースまで",
      },
      { icon: "icon-[mdi--bug-outline]", text: "既存アプリのデバッグと保守" },
      { icon: "icon-[mdi--account-tie]", text: "チームのリードとメンタリング" },
    ],
    videoAlt: "Webサイトの作り方（英語の動画）",
    playVideo: "動画を再生",
  },
  experience: {
    title: "経歴",
    present: "現在",
    place: (company: string, location: string) => `${company}（${location}）`,
  },
  portfolio: { title: "実績" },
  projects: {
    title: "最近のプロジェクト",
    intro: "個人で企画・開発しているプロダクトとオープンソースツールです。",
    visit: "サイトを見る",
    source: "ソースコード",
  },
  contact: {
    title: "お問い合わせ",
    emailLabel: "メールアドレス",
    emailPlaceholder: "メールアドレスを入力",
    emailRequired: "メールアドレスを入力してください",
    emailInvalid: "メールアドレスの形式が正しくありません",
    messageLabel: "お問い合わせ内容",
    messagePlaceholder: "お問い合わせ内容を入力",
    messageRequired: "お問い合わせ内容を入力してください",
    send: "送信",
    sending: "送信中",
    sent: "送信しました。\n2営業日以内にご返信いたします。",
    failed: "送信できませんでした。\n時間をおいて再度お試しください。",
    offline: "送信できませんでした。\nインターネット接続をご確認ください。",
    formErrors: "入力内容をご確認ください。",
    dismiss: "閉じる",
  },
  formatMonth: (year: number, month: number) => `${year}年${month}月`,
};

export const dictionary: Record<Locale, Dictionary> = { en, ja };
