/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        mist: "#b3b3b3",
        glow: "#f5f5f5"
      }
    }
  },
  corePlugins: {
    preflight: true
  },
  darkMode: "class"
};
