//app/layout.tsx
import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://codesquare.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Code Square Pvt. Ltd. - Software Studio in Kathmandu, Nepal",
    template: "%s | Code Square",
  },

  description:
    "Code Square is a Nepal-based software studio building websites, mobile apps, and custom software for businesses in Nepal and abroad. Four-person team, one project at a time.",

  keywords: [
    "Code Square",
    "Code Square Nepal",
    "Code Square Kathmandu",
    "software company Nepal",
    "software studio Kathmandu",
    "web development Nepal",
    "mobile app development Nepal",
    "custom software Nepal",
    "UI UX design Nepal",
    "software company Kathmandu",
  ],

  authors: [{ name: "Code Square Pvt. Ltd." }],
  creator: "Code Square Pvt. Ltd.",
  publisher: "Code Square Pvt. Ltd.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Code Square",
    title: "Code Square Pvt. Ltd. - Software Studio in Kathmandu, Nepal",
    description:
      "A four-person software studio in Kathmandu building websites, mobile apps, and custom software for businesses in Nepal and abroad.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code Square - Software Studio in Kathmandu",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Code Square Pvt. Ltd. - Software Studio in Kathmandu, Nepal",
    description:
      "A four-person software studio in Kathmandu building websites, mobile apps, and custom software.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}