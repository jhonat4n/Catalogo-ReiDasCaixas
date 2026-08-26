import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FavoritesProvider from "@/components/FavoritesProvider";
import FavoritesBar from "@/components/FavoritesBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ReviewPopup from "@/components/ReviewPopup";
import { getAvaliacoesPublicas } from "@/lib/sanity-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", weight: ["700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rei-das-caixas.vercel.app"),
  title: { default: "Rei das Caixas Artesanato | MDF, caixas e peças personalizadas", template: "%s | Rei das Caixas" },
  description: "Produtos de MDF, caixas, peças decorativas, lembrancinhas e itens personalizados em Contagem e Belo Horizonte.",
  icons: { icon: "/images/Logo.png", shortcut: "/images/Logo.png", apple: "/images/Logo.png" },
  openGraph: { type: "website", locale: "pt_BR", siteName: "Rei das Caixas Artesanato", title: "Rei das Caixas Artesanato", description: "Artesanato em MDF, caixas e peças personalizadas em MG.", images: [{ url: "/images/Logo.png", width: 1024, height: 1024, alt: "Logo Rei das Caixas" }] },
  twitter: { card: "summary", title: "Rei das Caixas Artesanato", description: "Artesanato em MDF, caixas e peças personalizadas em MG.", images: ["/images/Logo.png"] },
  other: { "instagram:site": "@rei_das_caixas", "instagram:creator": "@rei_das_caixas" },
};

export const viewport: Viewport = { themeColor: "#3B2A1E" };
export const revalidate = 60;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const reviews = await getAvaliacoesPublicas();
  return <html lang="pt-BR"><body className={`${inter.variable} ${lora.variable} font-texto`}><FavoritesProvider><Header />{children}<Footer /><FavoritesBar /><FloatingWhatsApp /><ReviewPopup reviews={reviews} /></FavoritesProvider></body></html>;
}
