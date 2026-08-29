import type { Metadata } from "next";
import { Syne, Montserrat } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
});
export const metadata: Metadata = {
  title: "Tresunotres. Branding & Identity",
  description:
    "A branding studio portfolio showcasing identity, packaging, and visual design work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${montserrat.variable} font-sans bg-ink text-paper antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
