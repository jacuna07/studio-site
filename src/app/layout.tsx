import type { Metadata, Viewport } from "next";
import { Syne, Montserrat } from "next/font/google";
import { SITE_IS_LIVE, SITE_URL } from "@/lib/site-config";
import { DEFAULT_SHARE_IMAGE, HOME_TITLE, SITE_DESCRIPTION, SITE_NAME } from "@/lib/metadata";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});
// Site-wide defaults, which are also the Home page's own title and share
// preview. Other pages set theirs with pageMetadata() (src/lib/metadata.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: SITE_DESCRIPTION,
  robots: SITE_IS_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [DEFAULT_SHARE_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SHARE_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C10",
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
