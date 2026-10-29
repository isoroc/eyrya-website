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
import { BRAND } from "@/lib/products";
import { formatMinimumOrderPerColor } from "@/lib/wholesale";

const siteUrl = BRAND.siteUrl;
const ogImage = `${siteUrl}/images/og-image.png`;

export const metadata: Metadata = {
  title: {
    default: "EYRYA® | EVA Foam Fingers & Custom Manufacturing",
    template: "%s | EYRYA",
  },
  description: `EYRYA makes 18-inch EVA foam hands. Buy the 12-pack on Amazon or the 6-pack on Temu, or order custom production from ${formatMinimumOrderPerColor()}.`,
  keywords: ["EVA foam finger", "foam hand", "foam fingers", "custom foam fingers", "promotional foam fingers", "bulk foam fingers", "EYRYA"],
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: "EYRYA - EVA Foam Fingers & Custom Manufacturing",
    description: `18-inch EVA foam hands. Retail packs from Amazon and Temu, custom production from ${formatMinimumOrderPerColor()} with your colours, thickness and logo.`,
    type: "website",
    url: `${siteUrl}/`,
    siteName: "EYRYA",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "EYRYA - EVA Foam Fingers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EYRYA - EVA Foam Fingers & Custom Manufacturing",
    description: `18-inch EVA foam hands. Retail packs from Amazon and Temu, custom production from ${formatMinimumOrderPerColor()}.`,
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
        {/* Keyboard users land here first. Hidden until focused, so it never
            appears for mouse users but skips the whole nav for everyone else. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#1a1a1a] focus:text-white focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": BRAND.name,
          "url": `${siteUrl}/`,
          "logo": `${siteUrl}/images/logo.svg`,
          "description": "EYRYA manufactures 18-inch EVA foam hands, including custom production runs with your own colours, thickness and logo.",
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
