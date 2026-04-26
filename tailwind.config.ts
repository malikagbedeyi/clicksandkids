import type { Config } from "tailwindcss";

const config: Config = {
  // Merged all content paths into one array
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./admin/**/*.{js,ts,jsx,tsx}", // Added your admin path here
  ],
  theme: {
    extend: {
      // Merged your custom colors
      colors: {
        warmOatCream: "#F3E9DC",
        deepCharcoalBerry: "#4A3728",
        slateTaupe: "#7F7F7F",
        softCoral: "#E09F7D",
        studioGold: "#C8A988", // Added your brand gold for convenience
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'], // Example if using next/font
      },
    },
  },
  plugins: [],
};

export default config;