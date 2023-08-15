/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        med: ["DMMedium", "default-system-font"],
        reg: ["DMRegular", "default-system-font"],
        bold: ["DMBold", "default-system-font"],
      },
    },
  },
  plugins: [],
};
