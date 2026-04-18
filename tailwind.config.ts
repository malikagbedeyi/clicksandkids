import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        warmOatCream: "#F3E9DC",
        deepCharcoalBerry: "#4A3728",
        slateTaupe: "#7F7F7F",
        softCoral: "#E09F7D",
      },
    },
  },
  plugins: [],
};

export default config;
