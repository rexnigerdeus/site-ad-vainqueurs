import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "1rem",
        xl: "0",
      },
      screens: {
        "2xl": "1320px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
    },
    extend: {
      colors: {
        // Charte Temple des Vainqueurs
        gold: {
          DEFAULT: "#C9A227",
          50: "#FBF6E5",
          100: "#F6ECC2",
          200: "#EFD989",
          300: "#E6C752",
          400: "#D9B33A",
          500: "#C9A227",
          600: "#A8841F",
          700: "#82611B",
          800: "#5C451A",
          900: "#3B2D17",
        },
        night: {
          DEFAULT: "#0B1E3F",
          50: "#E7EBF2",
          100: "#C4CCDB",
          200: "#8C9BB7",
          300: "#546A93",
          400: "#2A3F66",
          500: "#0B1E3F",
          600: "#091830",
          700: "#071224",
          800: "#050C18",
          900: "#03070E",
        },
        ivory: {
          DEFAULT: "#F8F4EC",
          50: "#FFFEFB",
          100: "#FDFBF5",
          200: "#FAF6EC",
          300: "#F8F4EC",
          400: "#F2EBDA",
          500: "#E8DEC5",
        },
        bordeaux: {
          DEFAULT: "#7A1F2B",
          400: "#A53D49",
          500: "#7A1F2B",
          600: "#631A24",
          700: "#4D141C",
        },
        border: "rgba(255,255,255,0.08)",
        muted: {
          DEFAULT: "#E8DEC5",
          foreground: "#5C451A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        "6": "1.5rem",
      },
      letterSpacing: {
        "tight-48": "-0.048em",
        "tight-56": "-0.056em",
        "tight-112": "-0.112em",
      },
      screens: {
        "2.5xl": "1440px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
      maxWidth: {
        "10/12": "83.333%",
        "8/12": "66.666%",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.7s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A227 0%, #E6C752 50%, #C9A227 100%)",
        "night-gradient": "linear-gradient(180deg, #0B1E3F 0%, #091830 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;