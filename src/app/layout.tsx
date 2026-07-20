import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["automobili", "prodaja vozila", "Sekulić Cars", "Srbija", "Crna Gora"],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "sr_RS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className={`${inter.variable} min-h-screen`}>{children}</body>
    </html>
  );
}
