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
        'prestige': ['PrestigeEliteStd', 'monospace'],
        'review': ['ReviewCondensed-Black', 'sans-serif'],
      },
      colors: {
        'rejects-green': {
          DEFAULT: '#8bd200',
        },
      },
    },
  },
  plugins: [],
};
export default config; 