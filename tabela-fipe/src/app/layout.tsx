import StoreProvider from "@/providers/store-provider";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { BASE_URL } from "@/constants";
import type { Metadata } from "next";

import "./globals.css";

const robotoFont = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Tabela Fipe - Consulte Preços de Veículos",
  description:
    "Consulte valores de carros, motos e caminhões na Tabela Fipe de forma rápida e prática.",
  openGraph: {
    url: new URL(BASE_URL),
    locale: "pt_BR",
    siteName: "Tabela Fipe Online",
    title: "Tabela Fipe - Consulte Preços de Veículos",
    description:
      "Consulte valores de carros, motos e caminhões na Tabela Fipe de forma rápida e prática.",
    type: "website",
    images: [
      {
        url: "/tabela-fipe.svg",
        type: "image/svg+xml",
        width: 1200,
        height: 700
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${robotoFont.variable}`}>
        <StoreProvider>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
