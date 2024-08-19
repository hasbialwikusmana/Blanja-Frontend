/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DB3022",
        hoverPrimary: "#b72a1f",
      },
    },
  },
  plugins: [],
};
