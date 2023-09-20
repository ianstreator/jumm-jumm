import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Imprima } from "next/font/google";
const imprima = Imprima({
  subsets: ["latin"],
  weight: "400",
});
// import { cookies } from "next/headers";

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
  // const theme = await getTheme();

  return (
    <Document theme={"Oscura"} imprima={imprima}>
      {children}
      <Analytics />
    </Document>
  );
}

// const getTheme = async () => {
//   const cookieStore = cookies();
//   const storedTheme = cookieStore.get("theme");
//   const theme = storedTheme?.value;
//   return theme;
// };
