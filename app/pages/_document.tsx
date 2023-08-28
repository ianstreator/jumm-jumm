"use client";
import { AppContextProvider } from "../context";
import { NextFont } from "next/dist/compiled/@next/font";

export default function Document({
  inter,
  children,
}: {
  children: React.ReactNode;
  inter: NextFont;
}) {
  return (
    <AppContextProvider>
      <html lang="en" data-theme="Oscura">
        <head>
          <link rel="icon" href="/images/favicon.png" sizes="any" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </AppContextProvider>
  );
}
