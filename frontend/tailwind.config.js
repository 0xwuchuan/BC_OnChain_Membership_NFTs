/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#407FED",
        secondary: "#FD983A",
        accent: "#FDC63A",
      },
      fontFamily: {
        sans: ["var(--font-lexend)"],
      },
    },
  },
  plugins: [],
};
