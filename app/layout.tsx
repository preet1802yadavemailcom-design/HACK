import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE NINE REALMS • Hacktoberfest Hack Day Jaunpur × Prasad Institute of Technology",
  description: "An award-level, cinematic, immersive 3D digital universe inspired by Navratri and open-source engineering. Join us on Saturday, October 24, 2026 at Prasad Institute of Technology, Jaunpur.",
  keywords: [
    "Hacktoberfest 2026",
    "Hack Day Jaunpur",
    "Prasad Institute of Technology",
    "The Nine Realms",
    "Navratri 3D Experience",
    "Open Source",
    "WebGL",
    "Three.js",
  ],
  authors: [{ name: "Shubhasheesh Kundu & Preet Yadav" }],
  openGraph: {
    title: "THE NINE REALMS • Hacktoberfest Hack Day Jaunpur",
    description: "Nine nights. Infinite possibilities. One community of builders.",
    siteName: "The Nine Realms",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#02040a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-midnight-950 text-foreground antialiased selection:bg-gold-500 selection:text-midnight-950 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
