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
const siteTitle = "Tresunotres. Branding & Identity";
const siteDescription =
  "A branding studio portfolio showcasing identity, packaging, and visual design work.";

export const metadata: Metadata = {
  metadataBase: new URL("https://studio-site-ochre.vercel.app"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Tresunotres",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Tresunotres",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/og-cover.jpg"],
  },
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
