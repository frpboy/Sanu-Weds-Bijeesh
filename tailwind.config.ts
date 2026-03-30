import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        cinzel: ["var(--font-cinzel)"],
        "great-vibes": ["var(--font-great-vibes)"],
      },
      colors: {
        gold: {
          500: "#d4af37",
        },
      },
    },
  },
  plugins: [],
};
export default config;
