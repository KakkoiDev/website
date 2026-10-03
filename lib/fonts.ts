import { Bebas_Neue, Inter, Noto_Sans_JP } from "next/font/google";

// Exposed as CSS variables (see tailwind.config.ts) so any element can pick
// its font: the pages mix Latin and Japanese text in both languages.
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Bebas Neue and Inter have no Japanese glyphs. The Japanese font is split
// into many unicode-range files, so it is not preloaded.
const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
  variable: "--font-noto-jp",
});

export const fontVariables = [
  bebasNeue.variable,
  inter.variable,
  notoSansJP.variable,
].join(" ");
