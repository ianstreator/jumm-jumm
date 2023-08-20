import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JummJumm",
  description:
    "Descubre un catálogo exclusivo de auténticos productos asiáticos, disponibles para envío dentro de Venezuela. Sumérgete en la rica variedad de culturas asiáticas y encuentra tesoros únicos de todo el continente. Nuestra tienda en línea ofrece una experiencia de compra fluida, completa con una potente función de creación de listas para seleccionar tus artículos favoritos. Encuentra los productos perfectos que reflejen tu gusto y estilo, ¡todo entregado directamente en tu puerta dentro de Venezuela!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/images/favicon.png" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}