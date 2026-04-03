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

export const metadata: Metadata = {
  title: {
    default: "EYRYA® | Foam Fingers, Party Supplies & Outdoor Products",
    template: "%s | EYRYA",
  },
  description: "EYRYA creates premium EVA foam fingers, party supplies, and outdoor products. 50,000+ sold. Shop on Amazon & Temu with fast shipping.",
  keywords: ["foam fingers", "EVA foam finger", "party supplies", "sports fan gear", "outdoor games", "bulk foam fingers", "EYRYA"],
  alternates: {
    canonical: "https://www.eyrya.com/",
  },
  openGraph: {
    title: "EYRYA - Premium Foam Fingers & Party Supplies",
    description: "Shop premium EVA foam fingers, LED party lights, and outdoor game kits. 50,000+ sold with 4.8-star rating.",
    type: "website",
    url: "https://www.eyrya.com/",
    siteName: "EYRYA",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EYRYA - Premium Foam Fingers & Party Supplies",
    description: "Shop premium EVA foam fingers, LED party lights, and outdoor game kits. 50,000+ sold.",
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
          "name": "EYRYA",
          "url": "https://www.eyrya.com/",
          "logo": "https://www.eyrya.com/images/logo.svg",
          "description": "EYRYA creates premium EVA foam fingers, party supplies, and outdoor products.",
          "sameAs": [],
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@eyrya.com",
            "contactType": "customer service",
          },
        }} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "EYRYA",
          "url": "https://www.eyrya.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.eyrya.com/products/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }} />
      </body>
    </html>
  );
}
