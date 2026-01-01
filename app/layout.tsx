import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Radio SunriseFm Suriname – Coming Soon",
  description: "Tijdelijke aankondiging voor Radio SunriseFm Suriname."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
