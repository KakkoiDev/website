import { Bebas_Neue, Inter, Noto_Sans_JP } from "next/font/google";

export const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export const inter = Inter({ subsets: ["latin"] });

// Bebas Neue and Inter have no Japanese glyphs. The Japanese font is split
// into many unicode-range files, so it is not preloaded.
export const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
});
