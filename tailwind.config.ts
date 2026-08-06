import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        vermelho: "#E4312B",
        dourado: "#FFC629",
        "marrom-escuro": "#3B2A1E",
        creme: "#FDF6EC",
        whatsapp: "#25D366",
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
