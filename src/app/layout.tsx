import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tranos Studio — Digital Reality",
  description:
    "Tranos Studio creates premium digital experiences powered by design, engineering, AI and motion.",
  applicationName: "Tranos Studio",
  keywords: ["Tranos", "AI", "digital studio", "web design", "creative technology"],
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
