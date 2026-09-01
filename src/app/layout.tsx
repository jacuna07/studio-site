import type { Metadata, Viewport } from "next";
import { Syne, Montserrat } from "next/font/google";
import { SITE_IS_LIVE } from "@/lib/site-config";
import SmoothScroll from "@/components/SmoothScroll";
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
const previewTitle = "Tresunotres – Site Preview";

export const metadata: Metadata = {
  metadataBase: new URL("https://studio-site-ochre.vercel.app"),
  title: siteTitle,
  description: siteDescription,
  robots: SITE_IS_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    title: previewTitle,
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
    title: previewTitle,
    description: siteDescription,
    images: ["/images/og-cover.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
