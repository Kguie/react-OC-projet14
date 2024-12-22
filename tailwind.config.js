/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6d8200",
          light: "#91a900",
          dark: "#5a6c00",
        },
        background: {
          DEFAULT: "#f9f9f9",
          light: "#ffffff",
          dark: "#9d9d9d",
        },
      },
    },
  },
  plugins: [],
};
