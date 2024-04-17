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
      "border-color": "#53535380",
      primary: "#E09145",
      text: {
        light: "#FCD9B8",
        white: "#F0F0F0",
        "white-transparent": "#F0F0F0AF",
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
        transparent: "#450A0A80",
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
    extend: {
      keyframes: {
        load: {
          "0%": { transform: "scale(1) rotate(0deg)", borderRadius: "5px", borderWidth: "2px" },
          "50%": {
            transform: "scale(1.5) rotate(180deg)",
            borderRadius: "80px",
            borderWidth: "100px",
          },
          "100%": { transform: "scale(1) rotate(360deg)", borderRadius: "5px", borderWidth: "2px" },
        },
        float65: {
          "0%": { transform: "translateY(0px) rotate(65deg)" },
          "50%": { transform: "translateY(20px) rotate(65deg)" },
          "100%": { transform: "translateY(0px) rotate(65deg)" },
        },
        float115: {
          "0%": { transform: "translateY(0px) rotate(-115deg)" },
          "50%": { transform: "translateY(20px) rotate(-115deg)" },
          "100%": { transform: "translateY(0px) rotate(-115deg)" },
        },
        float130: {
          "0%": { transform: "translateY(0px) rotate(130deg)" },
          "50%": { transform: "translateY(20px) rotate(130deg)" },
          "100%": { transform: "translateY(0px) rotate(130deg)" },
        },
        expand: {
          "from": { transform: "translateY(50px)", opacity: 0 },
          "to": { transform: "translateY(0px)", opacity: 1 },
        }
      },
      animation: {
        loading: "load 2s ease-in-out infinite",
        floating65: "float65 6s ease-in-out infinite",
        floating115: "float115 4s ease-in-out infinite",
        floating130: "float130 2s ease-in-out infinite",
        notificationExpand: "expand 1s ease-in-out"
      },
      backgroundImage: {
        "landing-gradient": "url('~/assets/gradient.png')",
        "landing-obj-texture": "url('~/assets/gradientObj.png')",
      },
    },
  },
  plugins: [],
};
