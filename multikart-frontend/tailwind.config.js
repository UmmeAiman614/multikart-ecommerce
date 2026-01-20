/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // 👇 FORCE TAILWIND TO BUILD THESE CLASSES
  safelist: [
    "bg-light-bg",
    "bg-light-card",
    "bg-light-section",
    "text-light-body",
    "text-light-text",

    "dark:bg-dark-bg",
    "dark:bg-dark-card",
    "dark:text-dark-body",
    "dark:text-dark-text",
  ],

  theme: {
    extend: {
      colors: {
        gold: {
          light: "#C9A24D",
          hover: "#B8922E",
          dark: "#D4AF37",
          glow: "#E6C76A",
        },

        light: {
          bg: "#FAF8F5",
          card: "#FFFFFF",
          section: "#F1EFEA",
          text: "#1C1C1C",
          body: "#444444",
          muted: "#7A7A7A",
        },

        dark: {
          bg: "#0F0F0F",
          card: "#1A1A1A",
          border: "#2A2A2A",
          text: "#F5F5F5",
          body: "#CFCFCF",
          muted: "#9A9A9A",
        },

        accent: {
          rose: "#E6B8B7",
          roseDark: "#C98F8F",
          emerald: "#1F6F54",
          emeraldDark: "#2FA37C",
        },
      },
    },
  },

  plugins: [],
};
