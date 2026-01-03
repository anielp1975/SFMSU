import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "SunriseFM Suriname – Live Radio",
  description: "Luister direct naar SunriseFM Suriname via onze online player of op 100.1 FM in Suriname."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
