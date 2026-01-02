import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "SunriseFM Suriname | 100.1 FM & wereldwijd online",
  description: "Luister SunriseFM Suriname op 100.1 FM of wereldwijd via sunrisefmsuriname.com, TuneIn en mobiele apps."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
