import type { Metadata } from "next";
import "./globals.css";
import { getLocaleFromCookie, localeMeta } from "@/lib/i18n";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { getSiteSettings } from "@/lib/public-data";
import SitePreferences from "@/components/site-preferences";
import MotionObserver from "@/components/motion-observer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfoliotranos.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Tranos Studio — Digital / AI / Creative", template: "%s | Tranos Studio" },
  description: "Tranos Studio builds premium digital products, AI systems, brand identities and cinematic digital experiences.",
  applicationName: "Tranos Studio",
  keywords: ["Tranos", "AI studio", "digital studio", "creative technology", "digital products", "branding", "3D motion"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Tranos Studio — Digital / AI / Creative",
    description: "Premium digital products, intelligent systems and visual identities.",
    type: "website",
    url: siteUrl,
    siteName: "Tranos Studio"
  },
  twitter: { card: "summary_large_image", title: "Tranos Studio — Digital / AI / Creative", description: "Premium digital products, intelligent systems and visual identities." },
  robots: { index: true, follow: true }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocaleFromCookie();
  const settings = await getSiteSettings();
  return (
    <html lang={locale} dir={localeMeta[locale].dir} data-theme={settings.defaultTheme === "light" ? "light" : "dark"} suppressHydrationWarning>
      <body>
        {children}
        <MotionObserver />
        <SitePreferences />
        <MobileBottomNav />
      </body>
    </html>
  );
}
