const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    colors: {
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      gray: "#18181b"
    },
    extend: {
      colors: {
        brand: {
          300: "#996DFF",
          500: "#8257e6"
        },
        indigo: {
          900: "#1e1b4b"
        }
      }
    }
  },
  plugins: []
});
