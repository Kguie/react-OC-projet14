/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6",
          light: "#60a5fa",
          dark: "#2563eb",
        },
        background: {
          DEFAULT: "#f9f9f9",
          light: "#ffffff",
          dark: "#9d9d9d",
        },
      },
      keyframes: {
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.80)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeOutScale: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.80)" },
        },
      },
      animation: {
        fadeInScale: "fadeInScale 300ms ease-out",
        fadeOutScale: "fadeOutScale 300ms ease-in",
      },
    },
  },
  plugins: [],
};
