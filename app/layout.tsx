import type { Metadata } from "next";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/teko/400.css";
import "@fontsource/teko/500.css";
import "@fontsource/teko/600.css";
import "@fontsource/teko/700.css";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { BRAND, formatCount, getFeaturedProduct } from "@/lib/products";

const siteUrl = BRAND.siteUrl;
const ogImage = `${siteUrl}/images/og-image.png`;
const featured = getFeaturedProduct();

export const metadata: Metadata = {
  title: {
    default: "EYRYA® | Foam Fingers, Party Supplies & Outdoor Products",
    template: "%s | EYRYA",
  },
  description: `EYRYA creates premium EVA foam fingers, party supplies, and outdoor products. ${formatCount(BRAND.productsSold)}+ sold. Shop on Amazon & Temu with fast shipping.`,
  keywords: ["foam fingers", "EVA foam finger", "party supplies", "sports fan gear", "outdoor games", "bulk foam fingers", "EYRYA"],
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: "EYRYA - Premium Foam Fingers & Party Supplies",
    description: `Shop premium EVA foam fingers, LED party lights, and outdoor game kits. ${formatCount(BRAND.productsSold)}+ sold with a ${featured.rating.toFixed(1)}-star rating.`,
    type: "website",
    url: `${siteUrl}/`,
    siteName: "EYRYA",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "EYRYA - Premium Foam Fingers & Party Supplies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EYRYA - Premium Foam Fingers & Party Supplies",
    description: `Shop premium EVA foam fingers, LED party lights, and outdoor game kits. ${formatCount(BRAND.productsSold)}+ sold.`,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": BRAND.name,
          "url": `${siteUrl}/`,
          "logo": `${siteUrl}/images/logo.svg`,
          "description": "EYRYA creates premium EVA foam fingers, party supplies, and outdoor products.",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@eyrya.com",
            "contactType": "customer service",
          },
        }} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": BRAND.name,
          "url": `${siteUrl}/`,
        }} />
      </body>
    </html>
  );
}
