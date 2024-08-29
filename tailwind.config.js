/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter",
      },
      colors: {
        primary: {
          DEFAULT: "#1D4ED8",
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#D97706",
          light: "#F59E0B",
          dark: "#B45309",
        },
        accent: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
      },
    },
  },
  plugins: [],
};
