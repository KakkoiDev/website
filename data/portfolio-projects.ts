import { PortfolioProjects } from "@/type";

export const portfolioProjects: PortfolioProjects = [
  {
    title: "TheseusAI",
    link: ["https://theseus-ai.com"],
    technologies: [
      "nextjs",
      "typescript",
      "react",
      "supabase",
      "tailwind",
      "playwright",
    ],
    fallbackImage: "https://cdn.kakkoi.dev/portfolio-theseus-ai.png",
    video: "https://cdn.kakkoi.dev/portfolio-theseus-ai.mp4",
    description: {
      en: "Developed with a team of 4 engineers, using the Agile methodology, an AI platform to extract financial intelligence from conversations. The platform processes audio files through our AI system to generate a transcript and a detailed explanation about what was said and what are the followup tasks to accomplish.",
      ja: "4名のエンジニアチームでアジャイル開発した、会話から金融インテリジェンスを抽出するAIプラットフォーム。音声ファイルをAIで処理し、文字起こしと発言内容の詳しい解説、そして次に取るべきタスクを生成します。",
    },
    achievements: {
      en: [
        "Built 80% of the frontend",
        "Helped to design and implement the whole architecture of the project",
        "Tested the app with Playwright",
        "Trained an intern to bring her up to speed",
        "Actively brought the team together",
      ],
      ja: [
        "フロントエンドの8割を開発",
        "プロジェクト全体のアーキテクチャの設計と実装に参画",
        "Playwrightによるアプリのテスト",
        "インターンを育成し、自走できるレベルまでサポート",
        "チームの結束づくりに積極的に貢献",
      ],
    },
  },
  {
    title: "Theseus Meeting",
    link: [
      {
        title: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.theseus.theseusmeeting&hl=en&gl=US",
      },
      {
        title: "Apple App Store",
        href: "https://apps.apple.com/fr/app/theseus-meeting/id6448635749?l=en-GB",
      },
    ],
    technologies: [
      "expo",
      "typescript",
      "react native",
      "supabase",
      "google play",
      "apple app store",
    ],
    fallbackImage: "https://cdn.kakkoi.dev/portfolio-theseus-ai-mobile.png",
    video: "https://cdn.kakkoi.dev/portfolio-theseus-ai-mobile.mp4",
    description: {
      en: "The companion app of TheseusAI. It is designed to record the audio of meetings and send them over to the AI platform. The app has been tested to make sure it would not stop recording even when receiving a call or locking the phone for an extended period of time. It can reliably send files even when in bad network conditions thanks to the implementation of resumable upload and background tasks.",
      ja: "TheseusAIのコンパニオンアプリ。会議の音声を録音し、AIプラットフォームへ送信します。着信があっても、長時間画面をロックしても録音が止まらないことを検証済み。レジューム可能なアップロードとバックグラウンド処理により、通信状況が悪くても確実にファイルを送信できます。",
    },
    achievements: {
      en: [
        "Coded the whole app from scratch",
        "Implemented resumable uploads",
        "Added a background service to retry uploads as soon as the phone turns on",
        "Added a foreground service to ensure the recording would never stop even when the phone is locked",
      ],
      ja: [
        "アプリ全体をゼロから開発",
        "レジューム可能なアップロードを実装",
        "端末の起動直後にアップロードを再試行するバックグラウンドサービスを追加",
        "画面ロック中も録音が止まらないようフォアグラウンドサービスを追加",
      ],
    },
  },
  {
    title: "La Fourche",
    link: ["https://lafourche.fr"],
    technologies: [
      "nextjs",
      "typescript",
      "react",
      "graphql",
      "redux",
      "playwright",
    ],
    fallbackImage: "https://cdn.kakkoi.dev/portfolio-la-fourche.png",
    video: "https://cdn.kakkoi.dev/portfolio-la-fourche.mp4",
    description: {
      en: 'Worked with a team of 11 engineers, 2 product owners and 1 tester, using the Scrum methodology, to improve the shopping cart and checkout of the organic online retail store "La Fourche".',
      ja: "エンジニア11名、プロダクトオーナー2名、テスター1名のスクラムチームで、オーガニック食品のECサイト「La Fourche」のカートと決済画面を改善しました。",
    },
    achievements: {
      en: [
        "Increased sales by 10% by implementing a PayPal payment option",
        "Advised on best practices and helped the team to mature technically",
      ],
      ja: [
        "PayPal決済の導入で売上を10%向上",
        "ベストプラクティスを提案し、チームの技術的な成長を支援",
      ],
    },
  },
  {
    title: "HelloAsso",
    link: ["https://helloasso.com"],
    technologies: [
      "nuxt",
      "vue",
      "javascript",
      "electron",
      "nodejs",
      "playwright",
      "jest",
    ],
    fallbackImage: "https://cdn.kakkoi.dev/portfolio-helloasso.png",
    video: "https://cdn.kakkoi.dev/portfolio-helloasso.mp4",
    description: {
      en: "Developed with a team of 5 engineers and 1 product owner, using the Scrum methodology, to improve the dashboard and payment journey of the biggest platform to find associations and run ticketing and crowdfunding in France. Basically, the scope of the team was from the moment the user logs in, until the moment he confirms a payment.",
      ja: "エンジニア5名とプロダクトオーナー1名のスクラムチームで、フランス最大の団体検索・チケット販売・クラウドファンディングのプラットフォームのダッシュボードと決済フローを改善しました。担当範囲は、ユーザーのログインから支払いの確定までです。",
    },
    achievements: {
      en: [
        "Overcame JavaScript's timezone bug with a robust wrapper, streamlining date and time handling and enhancing developer productivity",
        "Created an Electron application to help the product owner to record end-to-end tests with Playwright",
      ],
      ja: [
        "JavaScriptのタイムゾーン問題を堅牢なラッパーで解決し、日時処理を整理して開発効率を向上",
        "プロダクトオーナーがPlaywrightのE2Eテストを記録できるElectronアプリを開発",
      ],
    },
  },
];
