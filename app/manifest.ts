import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rei das Caixas",
    short_name: "Rei das Caixas",
    description: "Catálogo de artesanato em MDF, caixas e peças personalizadas.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF6EC",
    theme_color: "#3B2A1E",
    icons: [
      { src: "/images/Logo.png", sizes: "192x192", type: "image/png" },
      { src: "/images/Logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

