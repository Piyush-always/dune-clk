import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          400: "#A3A3A3",
          600: "#525252",
          900: "#0A0A0A",
        },
        surface: "#FAFAFA",
        glow: "#FFB776",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        DEFAULT: "1rem",
      },
      boxShadow: {
        soft: "0 10px 40px -20px rgb(0 0 0 / 0.15)",
        "soft-lg": "0 24px 60px -24px rgb(0 0 0 / 0.22)",
      },
      maxWidth: {
        container: "1200px",
      },
      letterSpacing: {
        widest2: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
