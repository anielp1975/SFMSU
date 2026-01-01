import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Welkom bij SFMSU",
  description: "Eenvoudige Next.js welkomstpagina klaar voor Hostinger."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
