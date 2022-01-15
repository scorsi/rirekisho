const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");

const config = {
  darkMode: "class",

  content: ["./src/**/*.{html,js,svelte,ts,css}"],

  theme: {
    extend: {}
  },

  plugins: [typography, forms]
};

module.exports = config;
