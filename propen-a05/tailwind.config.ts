import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      colors:{
        "indigo" : {
          100: "#E0EAFF",
          200: "#C7D7FE",
          300: "#A4BCFD",
          400: "#8098F9",
          500: "#6172F3",
          600: "#444CE7",
          700: "#3D3FDF",
          800: "#2D31A6",
          900: "#1F235B",
        },
        "yellow" : {
          100: "FFFFDC",
          200: "#FFFFC8",
          300: "#FFFFB6",
          400: "#FFFF7C",
          500: "#FFE655",
          600: "#FFD14D",
          700: "#FFBE46",
          800: "#886525",
          900: "#594218",
        },
        "gray" : {
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
        "error" : {
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#55160C",
        },
        "warning" : {
          100: "#FEF0C7",
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
          800: "#93370D",
          900: "#7A2E0E",
        },
        "success" : {
          100: "#ECFDF3",
          200: "#D1FADF",
          300: "#A6F4C5",
          400: "#32D583",
          500: "#039855",
          600: "#027A48",
          700: "#05603A",
          800: "#054F31",
          900: "#053321",
        }
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
