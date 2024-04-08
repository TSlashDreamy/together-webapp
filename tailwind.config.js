/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      black: "#0F0F0F",
      "semitransparent-dark": "#11121580",
      background: "#17181D",
      foreground: "#292C35",
      primary: "#E09145",
      text: {
        light: "#FCD9B8",
        white: "#F0F0F0",
      },
      content: {
        music: "#D0E957",
        video: "#F2B2D7",
        films: "#FFBC01",
        pictures: "#FFF5E9",
        documents: "#8665F2",
      },
      orange: {
        50: "#FFF7ED",
        100: "#FFEDD5",
        200: "#FED7AA",
        300: "#FDBA74",
        400: "#FB923C",
        500: "#F97316",
        600: "#EA580C",
        700: "#C2410C",
        800: "#9A3412",
        900: "#7C2D12",
        950: "#431407",
      },
      success: {
        50: "#F0FDF4",
        100: "#DCFCE7",
        200: "#BBF7D0",
        300: "#86EFAC",
        400: "#4ADE80",
        500: "#22C55E",
        600: "#16A34A",
        700: "#15803D",
        800: "#166534",
        900: "#14532D",
        950: "#052E16",
      },
      danger: {
        50: "#FEF2F2",
        100: "#FEE2E2",
        200: "#FECACA",
        300: "#FCA5A5",
        400: "#F87171",
        500: "#EF4444",
        600: "#DC2626",
        700: "#B91C1C",
        800: "#991B1B",
        900: "#7F1D1D",
        950: "#450A0A",
      },
    },
    extend: {},
  },
  plugins: [],
};
