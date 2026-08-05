import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
