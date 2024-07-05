import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg1" : "url('/backgrounds/1.jpg')",
        "card":" radial-gradient(circle, #ff232d, #ea3597, #976dce, #3f85c3, #4d8898 60%, rgba(0, 0, 0, 0) 100%);",
        "hero":"radial-gradient(circle, #f9457b, #d156ab, #926ac3, #4b76be, #0077a4, #006c8f, #00607b, #005467, #00415a, #002e4c, #001c3b, #030529);",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
