import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "footer":" linear-gradient(to bottom, #005d77, #00516d, #004663, #003b58, #00304d);",
        "card2":"radial-gradient(circle, #ff0007, #ff0045, #ff0072, #fe369a, #ea56bb, #cf66cc, #b173d6, #937dda, #6c7ed2, #477dc5, #227ab4, #0075a0 80%, rgba(0, 0, 0, 0) 100%);",
        "bg7":"url('/backgrounds/12.png')",
        "bg6":"url('/backgrounds/11.png')",
        "bg5":"url('/backgrounds/15.webp')",
        "bg4":"url('/backgrounds/11.png')",
        "bg3":"url('/backgrounds/17.jpeg')",
        "bg2" : "url('/backgrounds/3.jpg')",
        "bg1" : "url('/backgrounds/13.png')",
        "card":" radial-gradient(circle, #ff232d, #ea3597, #976dce, #3f85c3, #4d8898 60%, rgba(0, 0, 0, 0) 100%);",
        "hero":"radial-gradient(circle, #f9457b, #d156ab, #926ac3, #4b76be, #0077a4, #006c8f, #00607b, #005467, #00415a, #002e4c, #001c3b, #030529);",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        spinThreeTimes: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }, // 3 times 360 degrees
        },
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: '1' },
          "70%": { opacity: '1' },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: '0',
          },
        },
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        spinThreeTimes: 'spinThreeTimes 1s ease-in-out forwards',
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        meteor: "meteor 5s linear infinite",
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config


