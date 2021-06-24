module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      screens: {
        sm: "1200px",
        md: "1200px",
        lg: "1200px",
        xl: "1200px",
      },
    },
    height: {
      "500": "500px",
      "450": "450px",
      "400": "400px",
      "350": "350px",
      "300": "300px",
      full: "100%",
    },
    borderWidth: {
      "1": "1px",
      "2": "2px",
      "3": "3px",
      "4": "4px",
      "5": "5px",
      "6": "6px",
      "7": "7px",
      "8": "8px",
    },
    colors: {
      transparent: "transparent",

      black: "#000",
      white: "#fff",

      darkGrey: "#262626",
      lightGrey: "#6D6F72",
      lighterGrey: "#EEEEEE",
      orange: "#F77E0B",
    },
    fontFamily: {
      display: ["Inter", "system-ui"],
      sans: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
    extend: {
      width: {
        15.1: "15.1rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@graxmonzo/tailwind-caret-color"),
  ],
}
