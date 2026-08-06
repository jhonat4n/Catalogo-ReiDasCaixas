import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Rei das Caixas | Catálogo",
  description: "Catálogo de embalagens da Rei das Caixas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${lora.variable} font-texto`}><Header />{children}<Footer /></body>
    </html>
  );
}
