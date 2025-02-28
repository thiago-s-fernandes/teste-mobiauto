import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";

import "./globals.css";
import StoreProvider from "@/providers/store-provider";

const robotoFont = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap"
});

const SITE_URL = new URL(
  process.env.NODE_ENV === "development"
    ? (process.env.NEXT_PUBLIC_SITE_DEV_URL as string)
    : (process.env.NEXT_PUBLIC_SITE_PROD_URL as string)
);

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: "Tabela Fipe - Consulte Preços de Veículos",
  description:
    "Consulte valores de carros, motos e caminhões na Tabela Fipe de forma rápida e prática.",
  openGraph: {
    url: SITE_URL,
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
