import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { company, siteUrl } from "@/lib/site";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "IMNAZ MOON Technical Service LLC | Technical & Interior Solutions UAE",
    template: "%s | IMNAZ MOON Technical Service LLC",
  },
  description:
    "AL IMNAZ MOON Technical Service LLC is a professionally managed, Dubai-based technical services company delivering premium-quality maintenance, electromechanical, interior fit-out, painting, ceiling, tiling, kitchen, carpentry, and repair works across the UAE.",
  keywords: company.keywords,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    shortcut: "/favicon.ico",
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title:
      "IMNAZ MOON Technical Service LLC | UAE Technical & Interior Solutions",
    description:
      "Premium maintenance, electromechanical, interior fit-out, and contracting solutions in Dubai and across the UAE.",
    url: siteUrl,
    siteName: company.name,
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "IMNAZ MOON Technical Service LLC | UAE Technical & Interior Solutions",
    description:
      "Dubai-based electromechanical, maintenance, interior fit-out, and repair specialists.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technical Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
