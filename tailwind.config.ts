import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": "#7ED321",
        "brand-teal": "#00A6A6",
        "brand-teal-dark": "#008080",
        "brand-teal-light": "#e0f5f5",
        "brand-dark": "#1a2332",
        "brand-text": "#333333",
        "brand-muted": "#6B6B6B",
        "brand-bg": "#F5F7F9",
        "brand-green-light": "#eef7d8",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        sub: ["Oswald", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        ripple: "ripple 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        "slide-left": "slideLeft 0.6s ease forwards",
        "slide-right": "slideRight 0.6s ease forwards",
        "count-up": "countUp 2s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ripple: {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "70%": { transform: "scale(1.1)", opacity: "0.2" },
          "100%": { transform: "scale(1.2)", opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

