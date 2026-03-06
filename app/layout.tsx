import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EYRYA - Fun Products for Party, Play, Cheer & Outdoor",
  description: "EYRYA creates fun products for parties, sports events, playtime and outdoor activities. Shop EVA foam fingers, party supplies, toys and more.",
  keywords: ["party supplies", "toys", "sports fan gear", "outdoor fun", "foam finger", "EYRYA"],
  openGraph: {
    title: "EYRYA - Fun Products for Every Moment",
    description: "Bring more fun to parties, playtime and outdoor moments with EYRYA products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
