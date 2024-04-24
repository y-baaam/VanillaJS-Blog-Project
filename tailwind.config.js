/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      width: {
        medium: "45rem",
      },

      backgroundColor: {
        black: {
          100: "rgb(51,51,51)",
          200: "rgb(41,41,41)",
          300: "rgb(31,31,31)",
          400: "#1c1c1c",
        },
        white: {
          100: "rgb(255,255,255)",
          200: "rgb(230, 230, 230)",
          300: "rgb(200,200,200)",
        },
      },

      colors: {
        black: {
          100: "rgb(51,51,51)",
          200: "rgb(41,41,41)",
          300: "rgb(31,31,31)",
        },

        white: {
          100: "rgb(255,255,255)",
          200: "rgb(230, 230, 230)",
          300: "rgb(200,200,200)",
        },
      },

      minWidth: {
        sm: "40rem",
        md: "48rem",
        lg: "64rem",
        xl: "80rem",
      },

      fontSize: {
        body: ["1rem", { fontWeight: "400", lineHeight: "1.5rem" }],
        "body-bold": ["1rem", { fontWeight: "500", lineHeight: "1.25rem" }],

        caption1: ["0.85rem", { fontWeight: "400", lineHeight: "1.25rem" }],
        "caption1-bold": [
          "0.85rem",
          { fontWeight: "500", lineHeight: "1.25rem" },
        ],
        caption2: ["0.75rem", { fontWeight: "400", lineHeight: "1.125rem" }],
        "caption2-bold": [
          "0.75rem",
          { fontWeight: "600", lineHeight: "1.125rem" },
        ],
        caption3: ["0.7rem", { fontWeight: "400", lineHeight: "0.85rem" }],

        head: ["1.25rem", { fontWeight: "500", lineHeight: "2rem" }],
        "head-bold": ["1.25rem", { fontWeight: "700", lineHeight: "2rem" }],

        subHead: ["1.15rem", { fontWeight: "500", lineHeight: "2rem" }],
        "subHead-bold": ["1.15rem", { fontWeight: "700", lineHeight: "2rem" }],

        number: ["1.125rem", { fontWeight: "400", lineHeight: "1.25rem" }],
        "number-bold": [
          "1.125rem",
          { fontWeight: "500", lineHeight: "1.25rem" },
        ],
        "number-extra-bold": [
          "1.125rem",
          { fontWeight: "600", lineHeight: "1.25rem" },
        ],

        title: ["2rem", { fontWeight: "500", lineHeight: "1.85rem" }],
        "title-bold": ["2rem", { fontWeight: "600", lineHeight: "1.85rem" }],
        "title-extra-bold": [
          "2rem",
          { fontWeight: "700", lineHeight: "1.85rem" },
        ],

        subTitle: ["1.3rem", { fontWeight: "500", lineHeight: "1.625rem" }],
        "subTitle-bold": [
          "1.3rem",
          { fontWeight: "600", lineHeight: "1.625rem" },
        ],
      },

      fontFamily: {
        GmarketSansLight: ["GmarketSansLight", "sans-serif"],
        GmarketSansMedium: ["GmarketSansMedium", "sans-serif"],
        GmarketSansBold: ["GmarketSansBold", "sans-serif"],
      },

      keyframes: {
        blink: {
          to: { opacity: "0" },
        },
      },

      animation: {
        typing: "blink 0.8s infinite",
      },
    },
    variants: {
      extend: {
        textColor: ["visited"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
