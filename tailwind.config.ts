import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        sans: ["var(--font-inter)", "Helvetica Neue", "sans-serif"],
        jp: ["var(--font-noto-jp)", "Hiragino Sans", "sans-serif"],
      },
      colors: { muted: "#555" },
    },
  },
};
export default config;
