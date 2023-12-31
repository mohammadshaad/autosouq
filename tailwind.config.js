const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightOrange: "#fca311",
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
});
