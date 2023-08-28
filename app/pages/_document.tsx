"use client";
import { AppContextProvider } from "../context";
import { NextFont } from "next/dist/compiled/@next/font";

export default function Document({
  imprima,
  children,
  theme,
}: {
  children: React.ReactNode;
  imprima: NextFont;
  theme: string;
}) {
  return (
    <AppContextProvider>
      <html lang="en" data-theme={theme}>
        <head>
          <link rel="icon" href="/images/favicon.png" sizes="any" />
        </head>
        <body className={imprima.className}>{children}</body>
      </html>
    </AppContextProvider>
  );
}
