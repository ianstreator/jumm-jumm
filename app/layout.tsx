import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Imprima } from "next/font/google";
const imprima = Imprima({
  subsets: ["latin"],
  weight: "400",
});
import { cookies } from "next/headers";

import Document from "./pages/_document";

export const metadata: Metadata = {
  title: "JummJumm",
  description:
    "Descubre un catálogo exclusivo de auténticos productos asiáticos, disponibles para envío dentro de Venezuela. Sumérgete en la rica variedad de culturas asiáticas y encuentra tesoros únicos de todo el continente. Nuestra tienda en línea ofrece una experiencia de compra fluida, completa con una potente función de creación de listas para seleccionar tus artículos favoritos. Encuentra los productos perfectos que reflejen tu gusto y estilo, ¡todo entregado directamente en tu puerta dentro de Venezuela!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();

  return (
    <Document theme={theme || "Oscura"} imprima={imprima}>
      {children}
      <Analytics />
    </Document>
  );
}

const getTheme = async () => {
  const cookieStore = cookies();
  const storedTheme = cookieStore.get("theme");
  const theme = storedTheme?.value;
  return theme;
};
