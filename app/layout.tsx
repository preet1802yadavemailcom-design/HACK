import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://hack.pages.dev'),
  title: "Hacktoberfest Hack Day Jaunpur 2026 | Prasad Institute of Technology (Offline)",
  description: "The official offline in-person Hacktoberfest 2026 Hack Day at Prasad Institute of Technology, Jaunpur on Saturday, October 24, 2026. Join student builders for a 5.5-hour open-source sprint.",
  keywords: [
    "Hacktoberfest 2026",
    "Hack Day Jaunpur",
    "Prasad Institute of Technology",
    "Offline Hackathon",
    "Open Source",
    "College Hackathon",
    "Jaunpur Hackathon",
  ],
  authors: [{ name: "Shubhasheesh Kundu & Preet Yadav" }],
  icons: {
    icon: '/pit-logo.png',
    apple: '/pit-logo.png',
  },
  openGraph: {
    title: "Hacktoberfest Hack Day Jaunpur 2026 | Prasad Institute of Technology",
    description: "Physical in-person college hackathon on Saturday, October 24, 2026 at Prasad Institute of Technology, Jaunpur.",
    siteName: "Hacktoberfest Hack Day Jaunpur",
    type: "website",
    images: [
      {
        url: '/pit-logo.png',
        width: 313,
        height: 313,
        alt: 'Prasad Institute of Technology Jaunpur Logo',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
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
      <body className="bg-neutral-950 text-white antialiased selection:bg-amber-500 selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
