import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "rgb(255, 255, 255)",
          secondary: "rgb(237, 239, 241)",
          dark: "rgb(49, 61, 90)",
        },
        text: {
          light: "rgb(255, 255, 255)",
          primary: "rgb(24, 57, 160)",
          secondary: "rgb(0, 255, 197)",
          darkLigth: "rgb(144, 144, 144)",
          dark: "rgb(0, 0, 0)",
        },
        border: {
          light: "rgb(221, 224, 228)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
