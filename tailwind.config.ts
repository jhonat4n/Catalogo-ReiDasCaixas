import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        vermelho: "rgb(var(--color-vermelho) / <alpha-value>)",
        dourado: "rgb(var(--color-dourado) / <alpha-value>)",
        "marrom-escuro": "rgb(var(--color-marrom-escuro) / <alpha-value>)",
        creme: "rgb(var(--color-creme) / <alpha-value>)",
        whatsapp: "rgb(var(--color-whatsapp) / <alpha-value>)",
      },
      fontFamily: {
        titulo: ["var(--font-lora)", "serif"],
        texto: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
