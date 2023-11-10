import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Imprima } from "next/font/google";
const imprima = Imprima({
  subsets: ["latin"],
  weight: "400",
});

import Document from "./pages/_document";

export const metadata: Metadata = {
  title: "JummJumm",
  description:
    "Descubre un catálogo exclusivo de productos asiáticos con entrega en Venezuela en JummJumm. Explora la rica diversidad de culturas asiáticas y encuentra tesoros únicos. Síguenos en Instagram en @jummjumm.shop para obtener actualizaciones. Compra en línea fácilmente y recíbelo en tu puerta.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Document theme={"Rosa"} imprima={imprima}>
      {children}
      <Analytics />
    </Document>
  );
}