import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Tranos Studio | Premium AI & Digital Creative Studio",
  description: "We craft premium AI-powered digital solutions that transform brands and captivate audiences. Full-service digital studio specializing in AI integration, design, and development.",
  keywords: ["AI studio", "digital agency", "web development", "design studio", "machine learning", "creative technology"],
  authors: [{ name: "Tranos Studio" }],
  openGraph: {
    title: "Tranos Studio | Premium AI & Digital Creative Studio",
    description: "We craft premium AI-powered digital solutions that transform brands and captivate audiences.",
    type: "website",
    locale: "en_US",
    siteName: "Tranos Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tranos Studio | Premium AI & Digital Creative Studio",
    description: "We craft premium AI-powered digital solutions that transform brands and captivate audiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-black text-white font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
